import {
  RawNodeDatum,
  RenderCustomNodeElementFn,
} from 'react-d3-tree/lib/types/common';
import { Box, ButtonGroup, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Tree from 'react-d3-tree';
import { uid } from 'uid';
import NodeSettings from './components/NodeSettings';
import { TreeStrc } from '../../utils/types';
import { bfs, deleteBfs, editBfs } from './utils/nodeMethonds';
import MenuComponent from './components/Menu';

export function Index() {
  const [tree, setTree] = useState<TreeStrc>({
    name: 'root',
    answerFieldType: 'inputBox',
    id: uid(10),
    question: 'Question?',
    answers: [],
    children: [],
    url: '',
    answer: '',
  });
  const [node, setNode] = useState<RawNodeDatum | undefined>(undefined);

  function addNode(node: TreeStrc) {
    const newNodeData: TreeStrc = {
      name: '',
      answerFieldType: 'inputBox',
      id: uid(10),
      question: '',
      answers: [],
      children: [],
      url: '',
      answer: '',
    };
    const newTree = bfs(node.id, tree, newNodeData);

    setTree(newTree);
    setNode(newNodeData);
  }

  function deleteNode(node: TreeStrc) {
    const newTree = deleteBfs(node.id, tree);
    setTree(newTree);
  }

  function editNode(node: TreeStrc) {
    const newTree = editBfs(node.id, node, tree);
    setTree(newTree);
  }

  const RenderCustomNode: RenderCustomNodeElementFn = ({ nodeDatum }) => {
    return (
      <>
        <circle
          r="25"
          color=""
          stroke="none"
          fill="var(--chakra-colors-green-500)"
          style={{
            stroke: 'none',
          }}
          onClick={() => {
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
                addNode(nodeDatum as unknown as TreeStrc);
              }}
            >
              Add
            </Button>
            {!Boolean(nodeDatum?.attributes?.firstNode) && (
              <Button
                onClick={() => {
                  deleteNode(nodeDatum as unknown as TreeStrc);
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
    <Box w="100%" h="100vh">
      <MenuComponent />
      <Tree
        data={tree as unknown as RawNodeDatum[]}
        renderCustomNodeElement={RenderCustomNode}
        collapsible={false}
        translate={{ x: 600, y: 300 }}
        nodeSize={{
          x: 300,
          y: 250,
        }}
      />
      <NodeSettings
        Tree={tree}
        currentNode={node as TreeStrc}
        isOpen={Boolean(node)}
        onClose={() => {
          setNode(undefined);
        }}
        onSubmit={() => {
          setNode(undefined);
        }}
        editNode={editNode}
      />
    </Box>
  );
}