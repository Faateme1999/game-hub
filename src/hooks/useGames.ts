import useData from "./useData";

export interface platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  platforms: { platform: platform }[];
  //   design smell
  metacritic: number;
}

const useGames = () => useData<Game>("/games");

export default useGames;
