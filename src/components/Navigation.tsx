import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

const Nav: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box h="100vh">
      <IconButton
        icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        isRound={true}
        position={'absolute'}
        right="10px"
        colorScheme="green"
        onClick={toggleColorMode}
        aria-label="colour mode change"
      />
      <Center h={'100%'}>
        <ButtonGroup>
          <Button
            as={ReachLink}
            to="/build-tree"
            colorScheme="green"
            variant="solid"
          >
            Build Tree
          </Button>
          <Button
            as={ReachLink}
            colorScheme="green"
            variant="outline"
            to="/tree"
          >
            Show Questions
          </Button>
        </ButtonGroup>
      </Center>
    </Box>
  );
};

export default Nav;
