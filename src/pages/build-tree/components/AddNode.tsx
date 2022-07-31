import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Select,
  FormControl,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { TreeSchema } from '../../../../types/TreeTypes';
import { getTreeById, getTreesNames } from '../../../api/manageTreeApis';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addNodeMethod: (newNode?: TreeSchema) => void;
}

const OR = () => {
  return (
    <Stack direction="row" alignItems="center">
      <Divider />
      <Heading fontWeight="normal" fontSize="sm">
        OR
      </Heading>
      <Divider />
    </Stack>
  );
};

const AddNode: React.FC<Props> = ({ isOpen, onClose, addNodeMethod }) => {
  const { data, isLoading } = useQuery(['get-tree-names'], getTreesNames);
  const SelectBuildNode = useRef<HTMLSelectElement>(null);
  const SelectCollectionNode = useRef<HTMLSelectElement>(null);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add Node</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Button
                onClick={() => {
                  addNodeMethod();
                  onClose();
                }}
              >
                Create New Node
              </Button>

              <OR />

              <FormControl>
                <FormLabel htmlFor="url">Select Build Node</FormLabel>
                <Select ref={SelectBuildNode}>
                  {data?.map((values, index) => {
                    return (
                      <option value={values._id} key={index}>
                        {values.treeName}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                onClick={() => {
                  const value = SelectBuildNode.current?.value;
                  if (value)
                    getTreeById(value).then((value) => {
                      addNodeMethod(value.tree);
                    });
                }}
              >
                Add Node
              </Button>

              <OR />

              <FormControl>
                <FormLabel htmlFor="owner">
                  Select Node from Collection
                </FormLabel>
                <Select ref={SelectCollectionNode}>
                  <option value="segun">Segun Adebayo</option>
                  <option value="kola">Kola Tioluwani</option>
                  <option value="kola">Kola Tioluwani</option>
                </Select>
              </FormControl>
              <Button
                onClick={() => console.log(SelectCollectionNode.current?.value)}
              >
                Add Node
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddNode;
