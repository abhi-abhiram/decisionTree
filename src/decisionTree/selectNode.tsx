import { Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Dropdown } from "../components";
import { TreeProps } from "../Tree";
import addInput, { updateInput } from "../utils/addInput";

interface props {
  Node: TreeProps;
  NodesQueue: TreeProps[];
  setNodesQueue: React.Dispatch<React.SetStateAction<TreeProps[]>>;
  setSubmitButton: React.Dispatch<React.SetStateAction<boolean>>;
}

let ans = "";

const Node: React.FC<props> = ({
  Node,
  NodesQueue,
  setNodesQueue,
  setSubmitButton,
}) => {
  const [value, setValue] = useState("");

  const [disable, setDisable] = useState(false);

  ans = value;
  const selectCompo = () => {
    if (Node.name)
      switch (Node.answerFieldType) {
        case "dropdown":
          return (
            <Dropdown answers={Node.answers} setValue={setValue} ans={ans} />
          );
        case "multipleChoice":
          return <h2>{Node.question}</h2>;
        default:
          return <h1>enter valid field type</h1>;
      }
  };

  const searchingNode = () => {
    addInput(Node, value);
    setDisable(true);
    if (Node.children === undefined && value) {
      return setSubmitButton(true);
    } else if (Node.children && value) {
      setSubmitButton(false);
      let currentNode = NodesQueue.pop();
      let nextNodeIndex: number | undefined;
      while (true) {
        if (Node.name === currentNode?.name) {
          nextNodeIndex = Node.answers?.indexOf(value);
          if (nextNodeIndex === -1) {
            return -1;
          }
          break;
        } else {
          currentNode = NodesQueue.pop();
        }
      }
      if (Node.children && nextNodeIndex !== undefined) {
        setNodesQueue([...NodesQueue, Node, Node.children[nextNodeIndex]]);
      } else if (Node.children && nextNodeIndex) {
        setNodesQueue([...NodesQueue, Node, Node.children[0]]);
      }
    }
  };

  useEffect(() => {
    updateInput(Node, value);
  }, [value, Node]);

  return (
    <FormControl w={"100%"}>
      <Flex direction={"column"}>
        <FormLabel as="legend" colorScheme="green" alignSelf="stretch">
          {Node.question}
        </FormLabel>
        {selectCompo()}
        <Button
          marginTop="1rem"
          colorScheme="green"
          onClick={searchingNode}
          disabled={disable}
        >
          Next
        </Button>
      </Flex>
    </FormControl>
  );
};

export default Node;
