import { Button, ButtonGroup, Center, Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <Center h={"100%"}>
      <ButtonGroup>
        <Button colorScheme="green" variant="solid">
          <Link as={ReachLink} to="/tree">
            Build Tree
          </Link>
        </Button>
        <Button colorScheme="green" variant="outline">
          <Link as={ReachLink} to="/tree">
            Show Questions
          </Link>
        </Button>
      </ButtonGroup>
    </Center>
  );
};

export default Nav;
