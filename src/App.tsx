import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const showAside = useBreakpointValue({ base: false, lg: true });
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`, //1024px
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area={"nav"}>
          <NavBar />
        </GridItem>
        {showAside && (
          <GridItem area="aside" paddingX={5}>
            <GenreList selectedGenre={selectedGenre} onSelectGenre={(genre) => setSelectedGenre(genre)} />
          </GridItem>
        )}
        <GridItem area="main">
          <PlatformSelector selectedPlatform={selectedPlatform} onSelectPlatform={(platform)=>setSelectedPlatform(platform)}/>
          <GameGrid selectedPlatform={selectedPlatform} selectedGenre={selectedGenre} />
        </GridItem>
      </Grid>
      {/* <Button colorPalette='blue'>Click me</Button> */}
    </>
  );
}

export default App;
