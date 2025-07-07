import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/gaming-remote-controller-victor-illustration-mascot-logo-design_1146923-172.avif";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize="60px" />
      <Text>NavBar</Text>
    </HStack>
  );
};

export default NavBar;
