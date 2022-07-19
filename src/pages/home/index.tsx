import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from '@chakra-ui/react';
import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import JsonData from './data.json';

const TableData = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
);

type TableDataType = z.infer<typeof TableData>;

const data: TableDataType = JsonData;
type Props = { icon: JSX.Element; ariaLable: string };

const CustomButton = ({ icon, ariaLable }: Props) => {
  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        css={{
          ':focus': {
            boxShadow: 'none',
          },
        }}
        variant="outline"
        icon={icon}
        aria-label={ariaLable}
      />
    </Box>
  );
};

type SearchProps = {
  setFilteredData: React.Dispatch<React.SetStateAction<TableDataType>>;
  filteredData: TableDataType;
};

const searchString = (text: string) => {
  return text.toLowerCase().replaceAll(/\s/g, '');
};

const Search: React.FC<SearchProps> = ({ setFilteredData }) => {
  const [wordEntered, setWordEntered] = useState('');

  useEffect(() => {
    const simpleInputString = searchString(wordEntered);
    const timeId = setTimeout(() => {
      const newFilter = data.sort((a, b) => {
        const simpleAString = searchString(a.name);
        const simpleBString = searchString(b.name);
        if (
          simpleAString.indexOf(simpleInputString) !== -1 &&
          simpleBString.indexOf(simpleInputString) !== -1
        )
          return simpleAString.localeCompare(simpleBString);
        else if (simpleAString.indexOf(simpleInputString) !== -1) return -1;
        else if (simpleBString.indexOf(simpleInputString) !== -1) return 1;

        return simpleAString.localeCompare(simpleBString);
      });

      setFilteredData([...newFilter]);
    }, 500);

    return () => {
      clearTimeout(timeId);
    };
  }, [wordEntered]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };

  const clearInput = () => {
    setWordEntered('');
  };

  return (
    <InputGroup borderWidth={1} borderRadius={8}>
      <Input
        css={{
          ':focus': {
            boxShadow: 'none',
          },
        }}
        value={wordEntered}
        onChange={handleFilter}
        border="none"
        placeholder="Search Tree Name"
      />
      <InputRightAddon
        background="transparent"
        border="none"
        onClick={() => {
          console.log('called');
          if (wordEntered !== '') clearInput();
        }}
        children={wordEntered !== '' ? <CloseIcon /> : <SearchIcon />}
      />
    </InputGroup>
  );
};

const Home = () => {
  const [filteredData, setFilteredData] = useState<TableDataType>(data);

  return (
    <Box>
      <Box m="15px auto" w="50%" display="flex">
        <Input
          css={{
            ':focus': {
              boxShadow: 'none',
            },
          }}
          placeholder="Enter Tree Name"
        />
        <Button ml="5px" variant="outline" colorScheme={'green'}>
          Create New Tree
        </Button>
      </Box>
      <TableContainer
        w="80%"
        m="auto"
        borderWidth={1}
        borderRadius={8}
        borderBottom="none"
        maxH="80vh"
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4A5568',
            borderRadius: '24px',
          },
        }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center">
                <Search
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                />
              </Th>
              <Th textAlign="center">created At</Th>
              <Th textAlign="center">last updated</Th>
              <Th textAlign="center">display questions</Th>
              <Th textAlign="center">edit</Th>
              <Th textAlign="center">delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((value, index) => {
              return (
                <Tr key={index}>
                  <Td textAlign="center">{value.name}</Td>
                  <Td textAlign="center">{value.createdAt}</Td>
                  <Td textAlign="center">{value.updatedAt}</Td>
                  <Td>
                    <CustomButton
                      icon={<ExternalLinkIcon />}
                      ariaLable="display questions"
                    />
                  </Td>
                  <Td>
                    <CustomButton icon={<EditIcon />} ariaLable="edit" />
                  </Td>
                  <Td>
                    <CustomButton
                      icon={<DeleteIcon color="red.400" />}
                      ariaLable="delete"
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
