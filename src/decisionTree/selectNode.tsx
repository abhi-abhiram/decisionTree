import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { MultipleChoice, SearchBox, TextArea, InputBox } from "../components";
import { TreeProps } from "../Tree";
import addInput from "../utils/addInput";

interface props {
  Node: TreeProps;
  NodesQueue: TreeProps[];
  setNodesQueue: React.Dispatch<React.SetStateAction<TreeProps[]>>;
  setSubmitButton: React.Dispatch<React.SetStateAction<boolean>>;
}

function errorMessage(currentNode: TreeProps) {
  if (currentNode.answerFieldType === "multipleChoice") {
    return "Please select the option.";
  } else {
    return "Please enter the value.";
  }
}

const Node: React.FC<props> = ({
  Node,
  NodesQueue,
  setNodesQueue,
  setSubmitButton,
}) => {
  const [value, setValue] = useState("");
  const [disable, setDisable] = useState(false);
  const [isError, setError] = useState(false);

  const selectCompo = () => {
    switch (Node.answerFieldType) {
      case "multipleChoice":
        return (
          <MultipleChoice
            answers={Node.answers}
            setValue={setValue}
            disable={disable}
          />
        );
      case "textarea":
        return <TextArea {...{ disable, setValue }} />;
      case "searchBox":
        return <SearchBox {...{ disable, setValue }} />;
      case "inputBox":
        return <InputBox {...{ disable, setValue }} />;
      default:
        return <h1>enter valid field type</h1>;
    }
  };

  const nextNode = () => {
    if (value) {
      addInput(Node, value);
    }
    if (isError) {
      setError(false);
    }
    if (Node.children === undefined && value) {
      setDisable(true);
      return setSubmitButton(true);
    } else if (Node.children && value) {
      const nextNode = Node.answers?.indexOf(value);
      if (nextNode !== undefined && nextNode !== -1) {
        setDisable(true);
        setNodesQueue([...NodesQueue, Node.children[nextNode]]);
      } else if (
        Node.answerFieldType === "textarea" ||
        Node.answerFieldType === "inputBox"
      ) {
        setDisable(true);
        setNodesQueue([...NodesQueue, Node.children[0]]);
      }
    } else if (value === "") {
      setError(true);
    }
  };

  return (
    <FormControl w={"100%"} isInvalid={isError}>
      <Flex direction={"column"}>
        <FormLabel as="legend" colorScheme="green" alignSelf="stretch">
          {Node.question}
        </FormLabel>
        {selectCompo()}
        <FormErrorMessage>{errorMessage(Node)}</FormErrorMessage>
        <Button
          marginTop="1rem"
          colorScheme="green"
          onClick={nextNode}
          disabled={disable}
        >
          Next
        </Button>
      </Flex>
    </FormControl>
  );
};

export default Node;
