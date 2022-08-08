import { EditIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Box,
  List,
  ListItem,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useContext, useRef, useState } from 'react';
import { getOnlyTreeNames } from '../../../api/manageTreeApis';
import { getTreeById } from '../../../api/manageTreeApis';
import { TreeContext } from '../../../context/TreeContext';

type TreeNamesType = {
  _id: string;
  treeName: string;
  createdAt: string;
  updatedAt: string;
};

const TreeMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchInput = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useQuery(['get-Tree-names'], getOnlyTreeNames);
  const [filteredData, setFilteredData] = useState<TreeNamesType[]>([]);
  const [wordEntered, setWordEntered] = useState('');
  const { dispatch } = useContext(TreeContext);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    if (data) {
      const newFilter = data?.filter((value) => {
        return value.treeName.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord.trim()) {
        setFilteredData(newFilter);
      } else {
        setFilteredData([]);
      }
    }
  };

  return (
    <>
      <Button onClick={onOpen} size="sm" ml={1}>
        Switch to Tree
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        initialFocusRef={searchInput}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Box mt="1rem" bgColor="blackAlpha.500" borderRadius={5} p={2}>
              <InputGroup size="md">
                <Input
                  ref={searchInput}
                  type="text"
                  variant="flushed"
                  placeholder="Search Tree Name"
                  value={wordEntered}
                  onChange={handleFilter}
                />
                <InputRightElement>
                  <SearchIcon />
                </InputRightElement>
              </InputGroup>
              <List mt={2} spacing={3}>
                {!isLoading &&
                  filteredData.map((value, index) => {
                    return (
                      <ListItem
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        key={index}
                      >
                        {value.treeName}
                        <IconButton
                          size="xs"
                          icon={<EditIcon />}
                          variant="outline"
                          aria-label="edit"
                          onClick={() => {
                            getTreeById(value._id).then((value) => {
                              dispatch({ type: 'set', payload: value });
                            });
                          }}
                        />
                      </ListItem>
                    );
                  })}
                {isLoading && (
                  <>
                    <ListItem>
                      <Skeleton height="20px" />
                    </ListItem>
                    <ListItem>
                      <Skeleton height="20px" />
                    </ListItem>
                    <ListItem>
                      <Skeleton height="20px" />
                    </ListItem>
                    <ListItem>
                      <Skeleton height="20px" />
                    </ListItem>
                    <ListItem>
                      <Skeleton height="20px" />
                    </ListItem>
                    <ListItem>
                      <Skeleton height="20px" />
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TreeMenu;
