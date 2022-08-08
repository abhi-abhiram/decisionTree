import {
  HamburgerIcon,
  SettingsIcon,
  MoonIcon,
  SunIcon,
  ExternalLinkIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import { AiOutlineSave } from 'react-icons/ai';
import { FaLayerGroup } from 'react-icons/fa';
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { TreeContext } from '../../../context/TreeContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TreeSchema } from '../../../../types/TreeTypes';

const MenuComponent = ({
  tree,
  showCheckBox,
}: {
  tree: TreeSchema;
  showCheckBox: () => void;
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const treeContext = useContext(TreeContext);
  const toast = useToast();
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    if (showToast) {
      toast({
        title: 'Uploaded Successfully',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
        onCloseComplete() {
          setShowToast(false);
        },
      });
    }
  }, [showToast, toast]);

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
        <MenuItem
          icon={<ExternalLinkIcon fontSize="1rem" />}
          as={Link}
          to="/home"
        >
          Home
        </MenuItem>
        <MenuItem
          icon={<ExternalLinkIcon fontSize="1rem" />}
          as={Link}
          to="/tree"
        >
          Dispaly Questions
        </MenuItem>
        <MenuItem icon={<SettingsIcon fontSize="1rem" />}>
          Manage The Tree
        </MenuItem>
        <MenuItem icon={<FaLayerGroup />} onClick={showCheckBox}>
          Create Collection
        </MenuItem>
        <MenuItem
          icon={<AiOutlineSave fontSize="1rem" />}
          onClick={() => {
            axios
              .post('/api/update-tree', {
                _id: treeContext.state._id,
                tree,
                treeName: treeContext.state.treeName,
              })
              .then(() => {
                treeContext.dispatch({
                  type: 'update',
                  payload: { ...treeContext.state, tree },
                });
                setShowToast(true);
              });
          }}
        >
          Save
        </MenuItem>
        <MenuItem
          icon={
            colorMode === 'light' ? (
              <MoonIcon fontSize="1rem" />
            ) : (
              <SunIcon fontSize="1rem" />
            )
          }
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
