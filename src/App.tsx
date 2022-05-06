import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Nav } from "./components";
import Tree from "./decisionTree/displayTree";
import { Index } from "./buildTree";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w="100%" h="100vh" padding="10px">
      <IconButton
        icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        isRound={true}
        position={"absolute"}
        right="10px"
        colorScheme="green"
        onClick={toggleColorMode}
        aria-label="colour mode change"
      />
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/buildTree" element={<Index />} />
      </Routes>
    </Box>
  );
}

export default App;
