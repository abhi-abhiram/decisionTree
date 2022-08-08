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
import { useRef, useState } from 'react';
import { TreeSchema } from '../../../../types/TreeTypes';
import { getCollectionName } from '../../../api/collectionApis';
import { getTreeById, getTreesNames } from '../../../api/manageTreeApis';
import { changeIds } from '../utils/nodeMethonds';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addNodeMethod: (props: { node?: TreeSchema; nodes?: TreeSchema[] }) => void;
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
  const { data } = useQuery(['get-tree-names'], getTreesNames);
  const collectionNames = useQuery(['get-collection-names'], getCollectionName);
  const SelectBuildNode = useRef<HTMLSelectElement>(null);
  const SelectCollectionNode = useRef<HTMLSelectElement>(null);
  const [nodeLoading, setNodeLoading] = useState({
    preBuildNode: false,
    collectionNode: false,
  });

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
                  addNodeMethod({});
                  onClose();
                }}
                isDisabled={Boolean(
                  nodeLoading.collectionNode || nodeLoading.preBuildNode
                )}
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
                  if (value) {
                    setNodeLoading({ ...nodeLoading, preBuildNode: true });
                    getTreeById(value).then((value) => {
                      addNodeMethod({ node: value.tree });
                      setNodeLoading({ ...nodeLoading, preBuildNode: false });
                      onClose();
                    });
                  }
                }}
                isDisabled={Boolean(
                  nodeLoading.collectionNode || nodeLoading.preBuildNode
                )}
                isLoading={nodeLoading.preBuildNode}
              >
                Add Node
              </Button>

              <OR />

              <FormControl>
                <FormLabel htmlFor="owner">
                  Select Node from Collection
                </FormLabel>
                <Select ref={SelectCollectionNode}>
                  {collectionNames.data?.map((value, index) => {
                    return (
                      <option value={value._id} key={index}>
                        {value.treeName}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                onClick={() => {
                  const value = SelectCollectionNode.current?.value;
                  if (value) {
                    setNodeLoading({ ...nodeLoading, collectionNode: true });
                    getTreeById(value).then((value) => {
                      addNodeMethod({ nodes: changeIds(value.tree).children });
                      setNodeLoading({ ...nodeLoading, collectionNode: false });
                      onClose();
                    });
                  }
                }}
                isDisabled={Boolean(
                  nodeLoading.collectionNode || nodeLoading.preBuildNode
                )}
                isLoading={nodeLoading.collectionNode}
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
