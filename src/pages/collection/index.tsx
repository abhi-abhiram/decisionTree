import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections } from '../../api/collectionApis';

const Collection = () => {
  const { data, isLoading } = useQuery(['get-all-collections'], getCollections);

  return (
    <Box w='80%' m='1rem auto'>
      <SearchNodes data={data} />
      <Center mt='1rem'>{isLoading && <Spinner m='auto' />}</Center>
    </Box>
  );
};

interface CollectionType {
  name: string;
  _id: string;
}

type Props = {
  data: CollectionType[] | undefined;
};

const SearchNodes: React.FC<Props> = ({ data }) => {
  const [showBoxShadow, setBoxShadow] = useState(false);
  const boxShadowValue = {
    base: 'none',
    sm: useColorModeValue('md', 'dark-lg'),
  };
  const [listref] = useAutoAnimate<HTMLDivElement>();
  const nagivateTo = useNavigate();

  return (
    <Box
      boxShadow={showBoxShadow ? boxShadowValue : undefined}
      opacity={1}
      ref={listref}
    >
      <InputGroup>
        <Input
          placeholder='Search Collection Name'
          variant='flushed'
          onFocus={() => setBoxShadow(true)}
          onBlur={() => {
            setTimeout(() => {
              setBoxShadow(false);
            }, 200);
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
                onClick={() => {
                  nagivateTo(`/collection/edit/${value._id}`);
                }}
              >
                <ListIcon as={AddIcon} />
                {value.name}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Collection;
