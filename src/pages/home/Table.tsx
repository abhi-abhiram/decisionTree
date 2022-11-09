import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Input,
  InputGroup,
  InputRightAddon,
  TableContainer,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useContext } from 'react';
import { z } from 'zod';
import {
  cloneTree,
  deleteTreeById,
  getTreeById,
  getTreesNames,
  TreeNamesZodObj,
} from '../../api/manageTreeApis';
import { TreeContext } from '../../context/TreeContext';
import ChangeNameAlert from './ChangeNameAlert';
import DeleteAlert from './DeleteAlert';
import TableRow from './TableRow';

interface SearchProps<T> {
  setFilteredData: React.Dispatch<React.SetStateAction<T>>;
  filteredData: T;
}

const searchString = (text: string) => {
  return text.toLowerCase().replaceAll(/\s/g, '');
};

const Search: React.FC<SearchProps<z.infer<typeof TreeNamesZodObj>>> = ({
  setFilteredData,
  filteredData,
}) => {
  const [wordEntered, setWordEntered] = useState('');

  useEffect(() => {
    const simpleInputString = searchString(wordEntered);

    const timeId = setTimeout(() => {
      const newFilter = filteredData?.sort((a, b) => {
        const simpleAString = searchString(a.treeName);
        const simpleBString = searchString(b.treeName);
        if (
          simpleAString.indexOf(simpleInputString) !== -1 &&
          simpleBString.indexOf(simpleInputString) !== -1
        )
          return simpleAString.localeCompare(simpleBString);
        else if (simpleAString.indexOf(simpleInputString) !== -1) return -1;
        else if (simpleBString.indexOf(simpleInputString) !== -1) return 1;

        return simpleAString.localeCompare(simpleBString);
      });

      if (filteredData.length !== 0) setFilteredData([...newFilter]);
    }, 250);

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
        border='none'
        placeholder='Search Tree Name'
      />
      <InputRightAddon
        background='transparent'
        border='none'
        onClick={() => {
          if (wordEntered !== '') clearInput();
        }}
        children={wordEntered !== '' ? <CloseIcon /> : <SearchIcon />}
      />
    </InputGroup>
  );
};

const CustomTable = () => {
  const treeContext = useContext(TreeContext);
  const [deleteIndex, setDeleteIndex] = useState<number | undefined>();
  const { data, isLoading, refetch } = useQuery(
    ['get-all-tree-names'],
    getTreesNames
  );
  const [showNameChangePrompt, setPrompt] = useState('');

  const [filteredData, setFilteredData] = useState<
    z.infer<typeof TreeNamesZodObj>
  >([]);
  const onOpen = (index: number) => setDeleteIndex(index);
  const onClose = () => setDeleteIndex(undefined);

  useEffect(() => {
    if (data) setFilteredData(data);
  }, [data]);

  return (
    <>
      {!isLoading && (
        <TableContainer
          w='80%'
          m='auto'
          borderWidth={1}
          borderRadius={8}
          borderBottom='none'
          maxH='80vh'
          overflowY='auto'
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
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th textAlign='center'>
                  <Search
                    filteredData={filteredData}
                    setFilteredData={setFilteredData}
                  />
                </Th>
                <Th textAlign='center'>created At</Th>
                <Th textAlign='center'>last updated</Th>
                <Th textAlign='center'></Th>
                <Th textAlign='center'></Th>
                <Th textAlign='center'></Th>
                <Th textAlign='center'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData?.map((value, index) => {
                return (
                  <TableRow
                    key={index}
                    onClickDeleteBtn={async () => {
                      onOpen(index);
                    }}
                    onClickEditBtn={async () => {
                      return getTreeById(value._id).then((value) =>
                        treeContext?.dispatch({ type: 'set', payload: value })
                      );
                    }}
                    onClickQuesBtn={async () => {
                      return getTreeById(value._id).then((value) =>
                        treeContext?.dispatch({ type: 'set', payload: value })
                      );
                    }}
                    onClickCloneBtn={async () => {
                      return cloneTree(value._id);
                    }}
                    value={value}
                    onClickEditName={(id) => setPrompt(id)}
                  />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <DeleteAlert
        onClick={() => {
          if (deleteIndex || deleteIndex === 0) {
            const deleteItem = filteredData.splice(deleteIndex, 1);
            setFilteredData([...filteredData]);
            deleteTreeById(deleteItem[0]._id);
          }
        }}
        isOpen={Boolean(deleteIndex || deleteIndex === 0)}
        onClose={onClose}
      />
      <ChangeNameAlert
        isOpen={showNameChangePrompt}
        onClose={() => setPrompt('')}
        onSubmit={() => refetch()}
      />
      {isLoading && (
        <Center w='100%' h='80vh'>
          <Spinner />
        </Center>
      )}
    </>
  );
};

export default CustomTable;
