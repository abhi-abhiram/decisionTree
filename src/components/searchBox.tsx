import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

interface props {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disable: boolean;
}

const SearchBox: React.FC<props> = ({ setValue, disable }) => {
  const [searchData, setsearchData] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get<any, { data: { success: boolean; data: string[] } }>("/api/getData")
      .then((data) => {
        setsearchData(data.data.data);
      });
  }, []);

  function onChangeHandler(inputText: string) {
    let matches: string[] = [];
    if (inputText.length > 0) {
      matches = searchData.filter((str) => {
        const regex = new RegExp(`${inputText}`, "gi");
        return str.match(regex);
      });
    }
    setSuggestions(matches);
    setText(inputText);
  }

  function select(text: string) {
    setText(text);
    setValue(text);
    setSuggestions([]);
  }

  function addText(textArray: string[]) {
    return textArray.map((text, index) => {
      return (
        <Text
          css={{
            ":hover": {
              backgroundColor: "#718096",
            },
          }}
          textAlign="center"
          alignSelf={"stretch"}
          padding="0.8rem"
          cursor={"pointer"}
          key={index}
          onClick={() => select(text)}
        >
          {text}
        </Text>
      );
    });
  }

  return (
    <Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color={"green.200"} />}
        />
        <Input
          disabled={disable}
          value={text}
          onChange={(e) => onChangeHandler(e.target.value)}
        />
      </InputGroup>
      {searchData.length === 0 && (
        <Button
          width={"100%"}
          marginTop={"10px"}
          isLoading={true}
          css={{
            ":hover": {
              cursor: "default",
            },
          }}
        ></Button>
      )}
      {suggestions.length > 0 && (
        <VStack
          spacing={"0px"}
          divider={<Divider />}
          maxH={"400px"}
          overflowY="auto"
          bg="gray.600"
          w={"100%"}
          borderRadius="5px"
          position={"absolute"}
          zIndex="overlay"
          marginTop="10px"
        >
          {suggestions && addText(suggestions)}
        </VStack>
      )}
    </Box>
  );
};

export default SearchBox;
