import {
  HamburgerIcon,
  SettingsIcon,
  MoonIcon,
  SunIcon,
  ExternalLinkIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
        <MenuItem icon={<ExternalLinkIcon />} as={Link} to="/home">
          Home
        </MenuItem>
        <MenuItem icon={<ExternalLinkIcon />}>Dispaly Questions</MenuItem>
        <MenuItem icon={<SettingsIcon />}>Manage The Tree</MenuItem>
        <MenuItem
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        >
          {colorMode === 'light'
            ? 'Switch to Dark Mode'
            : 'Switch to Light Mode'}
        </MenuItem>
        <MenuItem icon={<CloseIcon />}>Close</MenuItem>
      </MenuList>
    </Menu>
  );
};
export default MenuComponent;
