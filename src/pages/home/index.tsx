import { Box, Button, IconButton, IconButtonProps } from '@chakra-ui/react';

import CustomTable from './Table';
import MenuCompo from './Menu';
import { useNavigate } from 'react-router-dom';

export const CustomButton = ({ ...props }: IconButtonProps) => {
  return (
    <Box display='flex' justifyContent='center'>
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
  const navigateTo = useNavigate();
  return (
    <>
      <Box display='flex'>
        <MenuCompo />
        <Button onClick={() => navigateTo('/collection')}>
          Go to collection
        </Button>
        <CustomTable />
      </Box>
    </>
  );
};

export default Home;
