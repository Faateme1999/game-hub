import axios, { AxiosInstance } from "axios";
import mockData from "../data/mockGames.json";
import MockAdapter from "axios-mock-adapter";
import { Platform } from "../hooks/useGames";

// export default axios.create({
//     baseURL:'https://api.rawg.io/api',
//     params:{
//         key:'c7b18323a47d40c394ea5b01964b1f5'
//     }
// })

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: { key: import.meta.env.VITE_RAWG_KEY ?? "dummy-key" },
});

if (import.meta.env.MODE === "development") {
  const mock = new MockAdapter(apiClient, { delayResponse: 300 });

  // استخراج پلتفرم‌های یکتا از دادهٔ ماک
  const platformMap = new Map<number, Platform>();
  mockData.games.forEach((game) =>
    game.platforms.forEach(({ platform }) =>
      platformMap.set(platform.id, platform)
    )
  );
  const platforms = Array.from(platformMap.values());

  // اندپوینت‌های ثابت
  mock.onGet("/genres").reply(200, { results: mockData.genres });
  mock.onGet("/platforms/lists/parents").reply(200, { results: platforms });

  // ────────────────────────────
  //  اندپوینت /games با فیلتر، سورت و سرچ
  // ────────────────────────────
  mock.onGet("/games").reply((config) => {
    const genreId = Number(config.params?.genres);

    const rawPlatforms = config.params?.platforms;
    const platformIds =
      rawPlatforms === undefined || rawPlatforms === null || rawPlatforms === ""
        ? []
        : String(rawPlatforms).split(",").map(Number).filter(Boolean);

    const ordering = config.params?.ordering as string | undefined;

    const searchText = (config.params?.search ?? "").toLowerCase();

    let results = mockData.games.slice();

    if (genreId)
      results = results.filter((g) =>
        g.genres.some((gen) => gen.id === genreId)
      );

    if (platformIds.length)
      results = results.filter((g) =>
        g.platforms.some((p) => platformIds.includes(p.platform.id))
      );

    if (searchText)
      results = results.filter((g) =>
        g.name.toLowerCase().includes(searchText)
      );

    if (ordering && ordering.trim() !== "") {
      let key = ordering.trim();
      let desc = false;

      if (key.startsWith("-")) {
        desc = true;
        key = key.slice(1);
      }

      type SortKey = "added" | "name" | "released" | "metacritic" | "rating";
      const validKeys: SortKey[] = [
        "added",
        "name",
        "released",
        "metacritic",
        "rating",
      ];

      if (validKeys.includes(key as SortKey)) {
        results.sort((a, b) => {
          let aVal: number | string = (a as any)[key];
          let bVal: number | string = (b as any)[key];

          if (key === "added") {
            aVal = (a as any)["id"];
            bVal = (b as any)["id"];
          }

          if (key === "released") {
            aVal = new Date(aVal as string).getTime();
            bVal = new Date(bVal as string).getTime();
          }

          if (typeof aVal === "string" && typeof bVal === "string") {
            return aVal.localeCompare(bVal) * (desc ? -1 : 1);
          } else {
            return ((aVal as number) - (bVal as number)) * (desc ? -1 : 1);
          }
        });
      }
    }

    return [200, { results }];
  });
}

export default apiClient;
