import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  const showAside = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`, //1024px
        }}
      >
        <GridItem area={"nav"}>
          <NavBar />
        </GridItem>
        {showAside && (
          <GridItem area="aside">
            Aside
          </GridItem>
        )}
        <GridItem area="main">
          Main
        </GridItem>
      </Grid>
      {/* <Button colorPalette='blue'>Click me</Button> */}
    </>
  );
}

export default App;
