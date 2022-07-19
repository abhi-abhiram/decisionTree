import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Tree from './pages/show-questions';
import { Index } from './pages/build-tree';
import { TreeContextProvider } from './context/TreeContext';
import Home from './pages/home';

function App() {
  return (
    <Box w="100%" h="100vh" padding="10px">
      <TreeContextProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/tree" element={<Tree />} />
          <Route path="/build-tree" element={<Index />} />
        </Routes>
      </TreeContextProvider>
    </Box>
  );
}

export default App;
