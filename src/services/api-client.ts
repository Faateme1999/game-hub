import axios, { AxiosInstance } from "axios";
import mockData from "../data/mockGames.json";
import MockAdapter from "axios-mock-adapter";

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
  mock.onGet("/games").reply(200, mockData);
}

export default apiClient;
