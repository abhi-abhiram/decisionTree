import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteCollection,
  getCollection,
  updateCollection,
} from '../../api/collectionApis';
import { getTreesNames } from '../../api/manageTreeApis';

const NewCollection = () => {
  const boxShadowValue = {
    base: 'none',
    sm: useColorModeValue('md', 'dark-lg'),
  };
  const { data } = useQuery(['get-all-tree-names'], getTreesNames);
  const [ids, setIds] = useState<Set<String>>(new Set());
  const [listref] = useAutoAnimate<HTMLDivElement>();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { id } = useParams();
  const [name, setValue] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (id) {
      getCollection(id).then((value) => {
        setValue(value.name);
        setLoading(false);
        return setIds(new Set(value.nodes.map((value) => value._id)));
      });
    }
  }, [id]);

  return (
    <Stack h='100vh'>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        borderWidth={1}
        borderRadius={8}
        boxShadow={boxShadowValue}
        width='35%'
        minH='50%'
        m='5rem auto'
      >
        <Stack spacing='6' h='100%' position='relative' ref={listref}>
          <Stack spacing='5'>
            <Input
              placeholder='Give A Name'
              value={name}
              onChange={(e) => setValue(e.target.value)}
            />
          </Stack>
          <Divider />
          <SearchNodes
            data={data}
            onClickItem={(id: Collection) => {
              if (!ids.has(id._id)) {
                ids?.add(id._id);
                setIds(new Set(ids));
              }
            }}
          />
          {Array.from(ids).map((id, index) => (
            <Box display='flex' justifyContent='space-between' key={index}>
              <Text>
                {
                  data?.find((value) => {
                    return value._id === id;
                  })?.treeName
                }
              </Text>
              <IconButton
                size='sm'
                icon={<DeleteIcon />}
                aria-label='remove item'
                onClick={() => {
                  if (ids.has(id)) {
                    ids.delete(id);
                    setIds(new Set(ids));
                  }
                }}
              />
            </Box>
          ))}
          {loading && (
            <Center>
              <Spinner />
            </Center>
          )}
          <Stack spacing='6' position='absolute' bottom='30px' w='100%'>
            <ButtonGroup w='100%'>
              <Button
                onClick={() => {
                  if (name && id) {
                    const nodes: {
                      treeName: string;
                      _id: string;
                    }[] = [];

                    setSaveLoading(true);
                    data?.forEach((value) => {
                      if (ids.has(value._id)) {
                        nodes.push({
                          _id: value._id,
                          treeName: value.treeName,
                        });
                      }
                    });

                    updateCollection({
                      _id: id,
                      name,
                      nodes,
                    }).then(() => {
                      setSaveLoading(false);
                      window.location.reload();
                    });
                  }
                }}
                w='100%'
                isLoading={saveLoading}
              >
                Save
              </Button>
              <Button
                w='100%'
                colorScheme='red'
                onClick={() => {
                  setDeleteLoading(true);
                  if (id)
                    deleteCollection(id).then(() => {
                      setDeleteLoading(false);
                      navigateTo('/collection');
                    });
                }}
                isLoading={deleteLoading}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

type Collection = {
  _id: string;
  treeName: string;
};

type Props = {
  onClickItem: (id: Collection) => void;
  data: Collection[] | undefined;
};

const SearchNodes: React.FC<Props> = ({ onClickItem, data }) => {
  const [showBoxShadow, setBoxShadow] = useState(false);
  const boxShadowValue = {
    base: 'none',
    sm: useColorModeValue('md', 'dark-lg'),
  };

  const [listref] = useAutoAnimate<HTMLDivElement>();
  return (
    <Box
      boxShadow={showBoxShadow ? boxShadowValue : undefined}
      opacity={1}
      ref={listref}
    >
      <InputGroup>
        <Input
          placeholder='Search Tree'
          variant='flushed'
          onFocus={() => setBoxShadow(true)}
          onBlur={() => {
            setTimeout(() => {
              setBoxShadow(false);
            }, 150);
          }}
        />
        <InputLeftElement width='3rem'>
          <SearchIcon w={4} h={4} />
        </InputLeftElement>
      </InputGroup>
      {showBoxShadow && (
        <Box position='relative' w='100%'>
          <List
            spacing={1}
            w='100%'
            position='absolute'
            boxShadow={showBoxShadow ? boxShadowValue : undefined}
            borderBottomRadius={10}
            pt={3}
            pb={3}
            background='#1A202C'
            zIndex={2}
            opacity={1}
          >
            {data?.map((value, index) => (
              <ListItem
                css={{
                  ':hover': {
                    backgroundColor: '#2D3748',
                    cursor: 'pointer',
                  },
                }}
                pl={3}
                pr={3}
                pt={2}
                pb={2}
                key={index}
                onClick={() => onClickItem(value)}
              >
                <ListIcon as={AddIcon} />
                {value.treeName}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default NewCollection;
