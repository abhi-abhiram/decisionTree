import { Box, Stack, ButtonGroup, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import NodeModal from "./components/NodeModal";
import NodeSettings from "./components/NodeSettings";
import setNodeSettings from "./utils/setNodeSettings";
import questionsTree, { TreeProps } from "../Tree";
import {
  RawNodeDatum,
  RenderCustomNodeElementFn,
} from "react-d3-tree/lib/types/common";

function bfs(
  name: string,
  tree: RawNodeDatum,
  deleteNode: boolean,
  node?: RawNodeDatum
) {
  const queue: RawNodeDatum[] = [];
  const queueQuestions: TreeProps[] = [];

  queue.unshift(tree);
  queueQuestions.unshift(questionsTree);

  while (queue.length > 0) {
    const curNode = queue.pop();
    const curQues = queueQuestions.pop();

    if (curNode && deleteNode) {
      let isNodeFound = false;
      curNode.children?.forEach((child, index) => {
        if (child.name === name) {
          curNode.children?.splice(index, 1);
          curQues?.children?.splice(index, 1);
          isNodeFound = true;
        }
      });
      if (isNodeFound) return { ...tree };
    } else if (curNode?.name === name && curNode && node) {
      curNode?.children?.push(node);
      curQues?.children?.push({
        name: node.name,
        question: "",
        answerFieldType: "inputBox",
      });
      return { ...tree };
    }

    const len = curNode?.children?.length;

    if (len && curNode.children) {
      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i]);
        if (curQues?.children) queueQuestions.unshift(curQues.children[i]);
      }
    }
  }
}

let firstRun = true;

export function Index() {
  const [tree, setTree] = useState<RawNodeDatum>({
    name: "",
    children: [],
  });
  const [node, setNode] = useState<RawNodeDatum | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [DeleteNode, setDeleteNode] = useState<RawNodeDatum | undefined>(
    undefined
  );
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
    setNode(undefined);
  };

  useEffect(() => {
    let newTree: RawNodeDatum | undefined = undefined;
    if (DeleteNode) newTree = bfs(DeleteNode.name, tree, true);
    if (newTree) setTree(newTree);
    setDeleteNode(undefined);
  }, [DeleteNode, tree]);

  const handleOnSubmit = (txt: string) => {
    let newTree: RawNodeDatum | undefined = undefined;
    if (node)
      newTree = bfs(node.name, tree, false, { name: txt, children: [] });
    if (newTree) setTree(newTree);
    setIsOpen(false);
    setNode(undefined);
  };

  const renderCustomNode: RenderCustomNodeElementFn = ({ nodeDatum }) => {
    return (
      <>
        <circle
          r="25"
          color=""
          stroke="none"
          fill="var(--chakra-colors-green-500)"
          style={{
            stroke: "none",
          }}
          onClick={() => {
            setOpenSettings(true);
            setNode(nodeDatum);
          }}
        />
        <foreignObject x="10" y="10" width="150px" height="100px">
          <Text textAlign="left" fontWeight="semibold" marginLeft="10px">
            {nodeDatum.name}
          </Text>
          <ButtonGroup alignSelf="center" size="sm" margin="10px 10px">
            <Button
              onClick={() => {
                setNode(nodeDatum);
                setIsOpen(true);
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                setDeleteNode(nodeDatum);
              }}
              color="red.600"
            >
              Delete
            </Button>
          </ButtonGroup>
        </foreignObject>
      </>
    );
  };

  return (
    <Stack direction="row" spacing="md">
      <Box w="100%" h="100vh">
        <Tree
          data={tree}
          renderCustomNodeElement={renderCustomNode}
          collapsible={false}
          translate={{ x: 600, y: 300 }}
          nodeSize={{
            x: 300,
            y: 250,
          }}
        />
        <NodeModal
          isOpen={Boolean(isOpen || firstRun)}
          onSubmit={
            firstRun
              ? (txt) => {
                  setTree({ name: txt, children: [] });
                  firstRun = false;
                }
              : handleOnSubmit
          }
          onClose={onClose}
        />
        <NodeSettings
          isOpen={openSettings}
          onClose={() => {
            setOpenSettings(false);
            setNode(undefined);
          }}
          onSubmit={() => {
            setNodeSettings(node as RawNodeDatum);
            setNode(undefined);
            setOpenSettings(false);
          }}
        />
      </Box>
    </Stack>
  );
}
