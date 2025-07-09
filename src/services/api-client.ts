import axios, { AxiosInstance } from "axios";
import mockData from "../data/mockGames.json";
import MockAdapter from "axios-mock-adapter";
import { platform } from "../hooks/useGames";

// export default axios.create({
//     baseURL:'https://api.rawg.io/api',
//     params:{
//         key:'c7b18323a47d40c394ea5b01964b1f5'
//     }
// })

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: { key: "dummy-key" },
});

if (import.meta.env.MODE === "development") {
  const mock = new MockAdapter(apiClient, { delayResponse: 300 });

  // استخراج پلتفرم‌ها به صورت یکتا از همه بازی‌ها
  const platformsSet = new Map<number, platform>();

  mockData.games.forEach((game) => {
    game.platforms.forEach((p) => {
      const platform = p.platform;
      if (!platformsSet.has(platform.id)) {
        platformsSet.set(platform.id, platform);
      }
    });
  });

  const platforms = Array.from(platformsSet.values());

  mock.onGet("/genres").reply(200, { results: mockData.genres });

  mock.onGet("/platforms/lists/parents").reply(200, { results: platforms });

  mock.onGet("/games").reply((config) => {
    const genreId = Number(config.params?.genres);

    if (!genreId) {
      return [200, { results: mockData.games }];
    }

    const filteredGames = mockData.games.filter((game) =>
      game.genres.some((g) => g.id === genreId)
    );

    return [200, { results: filteredGames }];
  });
}

export default apiClient;
