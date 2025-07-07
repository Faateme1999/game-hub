import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/gaming-remote-controller-victor-illustration-mascot-logo-design_1146923-172.avif";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
