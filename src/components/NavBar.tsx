import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/gaming-remote-controller-victor-illustration-mascot-logo-design_1146923-172.avif";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Image src={logo} boxSize="60px" />
      <SearchInput/>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
