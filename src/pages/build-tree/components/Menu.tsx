import {
  HamburgerIcon,
  AddIcon,
  RepeatIcon,
  SettingsIcon,
  MoonIcon,
  SunIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react';
import { GrHomeRounded } from 'react-icons/gr';

const MenuComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        position="absolute"
        right="30px"
      />
      <MenuList>
        <MenuItem icon={<AddIcon />}>Create New Tree</MenuItem>
        <MenuItem icon={<GrHomeRounded stroke="white" />}>Home</MenuItem>
        <MenuItem icon={<RepeatIcon />}>Open Closed Tab</MenuItem>
        <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
        <MenuItem
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        >
          {colorMode === 'light'
            ? 'Switch to Dark Mode'
            : 'Switch to Light Mode'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default MenuComponent;
