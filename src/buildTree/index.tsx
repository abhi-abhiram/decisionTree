import { Box, Stack, ButtonGroup, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import NodeModal from "./components/NodeModal";
import NodeSettings from "./components/NodeSettings";
import bfs from "./utils/nodeFunction";
import {
  RawNodeDatum,
  RenderCustomNodeElementFn,
} from "react-d3-tree/lib/types/common";
import quesTree, { TreeProps } from "../Tree";
import SubmitTree from "./components/SubmitTree";

export function Index() {
  const [tree, setTree] = useState<RawNodeDatum>({
    name: "",
    children: [],
    attributes: {
      firstNode: true,
    },
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
    if (DeleteNode) newTree = bfs(DeleteNode.name, tree, true, false);
    if (newTree) setTree(newTree);
    setDeleteNode(undefined);
  }, [DeleteNode, tree]);

  const handleOnSubmit = (txt: string) => {
    let newTree: RawNodeDatum | undefined = undefined;
    if (node)
      newTree = bfs(node.name, tree, false, false, { name: txt, children: [] });
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
            setNode(nodeDatum);
            setOpenSettings(true);
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
            {!Boolean(nodeDatum?.attributes?.firstNode) && (
              <Button
                onClick={() => {
                  setDeleteNode(nodeDatum);
                }}
                color="red.600"
              >
                Delete
              </Button>
            )}
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
          isOpen={Boolean(isOpen || !tree.name)}
          onSubmit={
            !tree.name
              ? (txt) => {
                  tree.name = txt;
                  quesTree.name = txt;
                  setTree({ ...tree });
                }
              : handleOnSubmit
          }
          onClose={onClose}
        />
        {openSettings && (
          <NodeSettings
            curQues={bfs(node?.name as string, tree, false, true) as TreeProps}
            isOpen={openSettings}
            onClose={() => {
              setOpenSettings(false);
              setNode(undefined);
            }}
            onSubmit={() => {
              setNode(undefined);
              setOpenSettings(false);
            }}
          />
        )}
      </Box>
      <SubmitTree />
    </Stack>
  );
}
