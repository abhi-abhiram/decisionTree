import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Nav } from './components';
import Tree from './pages/show-questions';
import { Index } from './pages/build-tree';
import { TreeContextProvider } from './context/TreeContext';

function App() {
  return (
    <Box w="100%" h="100vh" padding="10px">
      <TreeContextProvider>
        <Routes>
          <Route path="/home" element={<Nav />} />
          <Route path="/tree" element={<Tree />} />
          <Route path="/build-tree" element={<Index />} />
        </Routes>
      </TreeContextProvider>
    </Box>
  );
}

export default App;
