import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
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
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCollection } from '../../api/collectionApis';
import { getTreesNames } from '../../api/manageTreeApis';

const NewCollection = () => {
  const boxShadowValue = {
    base: 'none',
    sm: useColorModeValue('md', 'dark-lg'),
  };
  const { data, isLoading } = useQuery(['get-all-tree-names'], getTreesNames);
  const [ids, setIds] = useState<Set<CollectionId>>(new Set());
  const [listref] = useAutoAnimate<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [createLoading, setCreateLoading] = useState(false);

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
            <Input placeholder='Give A Name' ref={inputRef} />
          </Stack>
          <Divider />
          <SearchNodes
            data={data}
            onClickItem={(id: CollectionId) => {
              if (!ids.has(id)) {
                ids?.add(id);
                setIds(new Set(ids));
              }
            }}
            isLoading={isLoading}
          />
          {Array.from(ids).map((value) => (
            <Box display='flex' justifyContent='space-between' key={value._id}>
              <Text>{value.treeName}</Text>
              <IconButton
                size='sm'
                icon={<DeleteIcon />}
                aria-label='remove item'
                onClick={() => {
                  if (ids.has(value)) {
                    ids.delete(value);
                    setIds(new Set(ids));
                  }
                }}
              />
            </Box>
          ))}
          <Stack spacing='6' bottom='30px' w='100%'>
            <Button
              onClick={() => {
                const name = inputRef.current?.value;
                setCreateLoading(true);
                if (name) {
                  createCollection(
                    name,
                    Array.from(ids).map((value) => {
                      return { _id: value._id, treeName: value.treeName };
                    })
                  ).then((value) => {
                    setCreateLoading(false);
                    navigate(`/collection/edit/${value.data.id}`);
                  });
                }
              }}
              isLoading={createLoading}
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

type CollectionId = {
  _id: string;
  treeName: string;
};

type Props = {
  onClickItem: (id: CollectionId) => void;
  data: CollectionId[] | undefined;
  isLoading: boolean;
};

const SearchNodes: React.FC<Props> = ({ onClickItem, data, isLoading }) => {
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
            {isLoading && (
              <Center mt='1rem'>
                <Spinner />
              </Center>
            )}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default NewCollection;
