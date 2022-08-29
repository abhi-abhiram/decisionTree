import { HamburgerIcon, AddIcon } from '@chakra-ui/icons';
import {
  IconButton,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewTreeModal from './NewTreeModal';

const MenuCompo = () => {
  const [newTreeModal, setNewTreeModal] = useState(false);
  const navigateTo = useNavigate();

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
          position='absolute'
          right='30px'
        />
        <MenuList>
          <MenuItem icon={<AddIcon />} onClick={() => setNewTreeModal(true)}>
            Create New Tree
          </MenuItem>
          <MenuItem
            icon={<AddIcon />}
            onClick={() => navigateTo('/collection/new')}
          >
            Create New Collection
          </MenuItem>
        </MenuList>
      </Menu>
      <NewTreeModal
        isOpen={newTreeModal}
        onClose={() => setNewTreeModal(false)}
      />
    </>
  );
};

export default MenuCompo;
