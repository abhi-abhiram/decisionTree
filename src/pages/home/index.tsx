import {
  Box,
  IconButton,
  Input,
  Button,
  IconButtonProps,
} from '@chakra-ui/react';
import { useContext, useRef, useState } from 'react';
import { TreeContext } from '../../context/TreeContext';
import { createNewTree } from '../../api/manageTreeApis';
import CustomTable from './Table';
import { useNavigate } from 'react-router-dom';

export const CustomButton = ({ ...props }: IconButtonProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        css={{
          ':focus': {
            boxShadow: 'none',
          },
        }}
        {...props}
      />
    </Box>
  );
};

const Home = () => {
  const treeContext = useContext(TreeContext);
  const input = useRef<HTMLInputElement>(null);
  const [isLoadingCreateBtn, setLoadingCreateBtn] = useState(false);
  const navigateTo = useNavigate();

  return (
    <Box>
      <Box m="15px auto" w="50%" display="flex">
        <Input
          css={{
            ':focus': {
              boxShadow: 'none',
            },
          }}
          ref={input}
          placeholder="Enter a Tree name"
        />
        <Button
          ml="5px"
          variant="outline"
          colorScheme={'green'}
          onClick={() => {
            if (input.current?.value) {
              setLoadingCreateBtn(true);
              createNewTree(input.current?.value).then((value) => {
                treeContext?.dispatch({ type: 'set', payload: value });
                setLoadingCreateBtn(false);
                navigateTo('/build-tree');
              });
            }
          }}
          isLoading={isLoadingCreateBtn}
        >
          Create New Tree
        </Button>
      </Box>
      <CustomTable />
    </Box>
  );
};

export default Home;
