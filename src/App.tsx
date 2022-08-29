import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Tree from './pages/show-questions';
import { Index } from './pages/build-tree';
import { TreeContextProvider } from './context/TreeContext';
import Home from './pages/home';
import { useEffect } from 'react';
import Collection from './pages/collection';
import EditCollection from './pages/collection/edit';
import NewCollection from './pages/collection/new';

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/home');
  }, []);

  return <></>;
};

const queryClient = new QueryClient();

function App() {
  return (
    <Box w='100%' h='100vh' padding='10px'>
      <QueryClientProvider client={queryClient}>
        <TreeContextProvider>
          <Routes>
            <Route path='/' element={<Redirect />} />
            <Route path='/home' element={<Home />} />
            <Route path='/tree' element={<Tree />} />
            <Route path='/build-tree' element={<Index />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/collection/edit/:id' element={<EditCollection />} />
            <Route path='/collection/new' element={<NewCollection />} />
          </Routes>
        </TreeContextProvider>
      </QueryClientProvider>
    </Box>
  );
}

export default App;
