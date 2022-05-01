import { Button, ButtonGroup, Center } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <Center h={"100%"}>
      <ButtonGroup>
        <Button
          as={ReachLink}
          to="buildTree"
          colorScheme="green"
          variant="solid"
        >
          Build Tree
        </Button>
        <Button as={ReachLink} colorScheme="green" variant="outline" to="/tree">
          Show Questions
        </Button>
      </ButtonGroup>
    </Center>
  );
};

export default Nav;
