import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Heading,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Checkbox,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Children, Collection, TreeSchema } from '../../../../types/TreeTypes';
import { getCollections } from '../../../api/collectionApis';
import { getTreeById, getTreesNames } from '../../../api/manageTreeApis';
import { SearchBar } from '../../../components';
import { getValue } from '../../../components/SearchBar';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addNodeMethod: (props: { node?: TreeSchema; nodes?: Children }) => void;
  addParent: () => void;
}

const OR = () => {
  return (
    <Stack direction='row' alignItems='center'>
      <Divider />
      <Heading fontWeight='normal' fontSize='sm'>
        OR
      </Heading>
      <Divider />
    </Stack>
  );
};

const AddNode: React.FC<Props> = ({
  isOpen,
  onClose,
  addNodeMethod,
  addParent,
}) => {
  const { data } = useQuery(['get-tree-names'], getTreesNames);
  const { data: collections } = useQuery(['get-collections'], getCollections);
  const [nodeLoading, setNodeLoading] = useState({
    preBuildNode: false,
    collectionNode: false,
  });
  const [showCollection, setShowCollection] = useState(false);
  const treesSearchData = useMemo(() => {
    return data?.map(({ _id, treeName }) => {
      return {
        _id,
        name: treeName,
      };
    });
  }, [data]);

  return (
    <>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Add Node</DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
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

              <SearchBar elements={treesSearchData ? treesSearchData : []} />
              <Button
                onClick={() => {
                  const value = getValue();
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

              <SearchBar elements={collections ? collections : []} />
              <Button
                onClick={() => {
                  const id = getValue();

                  if (id) {
                    setShowCollection(true);
                  }
                }}
                isDisabled={Boolean(
                  nodeLoading.collectionNode || nodeLoading.preBuildNode
                )}
                isLoading={nodeLoading.collectionNode}
              >
                Add Node
              </Button>

              <OR />

              <Button
                isDisabled={Boolean(
                  nodeLoading.collectionNode || nodeLoading.preBuildNode
                )}
                onClick={addParent}
              >
                Add Parent Node
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <SelectNodes
        collection={getCollection(getValue(), collections)}
        isOpen={showCollection}
        onClose={() => {
          setShowCollection(false);
          onClose();
        }}
        onAdd={(ids) => {
          const collection = collections?.find((value) => {
            return value._id === getValue();
          });

          const nodes: Children = [];

          collection?.nodes.forEach((value) => {
            if (ids.has(value._id)) {
              nodes.push({
                name: value.treeName,
                id: value._id,
              });
            }
          });

          addNodeMethod({
            nodes: nodes,
          });
        }}
      />
    </>
  );
};

const SelectNodes: React.FC<{
  collection?: Collection;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ids: Set<string>) => void;
}> = ({ collection, isOpen, onClose, onAdd }) => {
  const [checkedItems, setCheckedItems] = useState(new Set<string>());

  const allChecked = checkedItems.size === collection?.nodes?.length;
  const isIndeterminate = checkedItems.size > 0 && !allChecked;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setCheckedItems(new Set());
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select nodes from collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => {
              if (allChecked) {
                setCheckedItems(new Set());
              } else {
                setCheckedItems(
                  new Set(collection?.nodes.map((value) => value._id))
                );
              }
            }}
          >
            Select All
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            {collection?.nodes.map((value) => {
              return (
                <Checkbox
                  isChecked={checkedItems.has(value._id)}
                  onChange={() => {
                    if (checkedItems.has(value._id)) {
                      checkedItems.delete(value._id);
                    } else {
                      checkedItems.add(value._id);
                    }

                    setCheckedItems(new Set(checkedItems));
                  }}
                  key={value._id}
                >
                  {value.treeName}
                </Checkbox>
              );
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() => {
              onAdd(checkedItems);
              onClose();
            }}
          >
            Add
          </Button>
          <Button
            onClick={() => {
              setCheckedItems(new Set());
              onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const getCollection = (id?: string, collections?: Collection[]) => {
  if (collections) {
    for (const collection of collections) {
      if (collection._id === id) {
        return collection;
      }
    }
  }
};

export default AddNode;
