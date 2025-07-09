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

// const apiClient: AxiosInstance = axios.create({
//   baseURL: "https://api.rawg.io/api",
//   params: { key: "dummy-key" },
// });

// if (import.meta.env.MODE === "development") {
//   const mock = new MockAdapter(apiClient, { delayResponse: 300 });

//   // استخراج پلتفرم‌ها به صورت یکتا از همه بازی‌ها
//   const platformsSet = new Map<number, Platform>();

//   mockData.games.forEach((game) => {
//     game.platforms.forEach((p) => {
//       const platform = p.platform;
//       if (!platformsSet.has(platform.id)) {
//         platformsSet.set(platform.id, platform);
//       }
//     });
//   });

//   const platforms = Array.from(platformsSet.values());

//   mock.onGet("/genres").reply(200, { results: mockData.genres });

//   mock.onGet("/platforms/lists/parents").reply(200, { results: platforms });

//   mock.onGet("/games").reply((config) => {
//     const genreId = Number(config.params?.genres);

//     if (!genreId) {
//       return [200, { results: mockData.games }];
//     }

//     const filteredGames = mockData.games.filter((game) =>
//       game.genres.some((g) => g.id === genreId)
//     );

//     return [200, { results: filteredGames }];
//   });
// }

// export default apiClient;




const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: { key: import.meta.env.VITE_RAWG_KEY ?? "dummy-key" },
});

// ───────────────────────────────
//  ماک فقط در محیط توسعه
// ───────────────────────────────
if (import.meta.env.MODE === "development") {
  const mock = new MockAdapter(apiClient, { delayResponse: 300 });

  // استخراج پلتفرم‌های یکتا
  const platformMap = new Map<number, Platform>();
  mockData.games.forEach((game) =>
    game.platforms.forEach(({ platform }) =>
      platformMap.set(platform.id, platform),
    ),
  );
  const platforms = Array.from(platformMap.values());

  // اندپوینت‌های ثابت
  mock.onGet("/genres").reply(200, { results: mockData.genres });
  mock.onGet("/platforms/lists/parents").reply(200, { results: platforms });

  // اندپوینت /games با فیلتر ژانر و پلتفرم
  mock.onGet("/games").reply((config) => {
    const genreId = Number(config.params?.genres);

    // ممکن است platforms عدد خالی یا مجموعه‌ای از اعداد باشد
    const raw = config.params?.platforms;
    const platformIds =
      raw === undefined || raw === null || raw === ""
        ? []
        : String(raw) // اگر عدد بود، به رشته تبدیل می‌کنیم
            .split(",")
            .map(Number)
            .filter(Boolean); // اعداد معتبر

    let results = mockData.games;

    if (genreId)
      results = results.filter((g) =>
        g.genres.some((gen) => gen.id === genreId),
      );

    if (platformIds.length)
      results = results.filter((g) =>
        g.platforms.some((p) => platformIds.includes(p.platform.id)),
      );

    return [200, { results }];
  });
}

export default apiClient;