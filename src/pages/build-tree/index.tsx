import {
  RawNodeDatum,
  RenderCustomNodeElementFn,
} from 'react-d3-tree/lib/types/common';
import { Box, ButtonGroup, Button, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import Tree from 'react-d3-tree';
import { v4 } from 'uuid';
import NodeSettings from './components/NodeSettings';
import { bfs, deleteBfs, editBfs } from './utils/nodeMethonds';
import MenuComponent from './components/Menu';
import { TreeSchema } from '../../../types/TreeTypes';
import { TreeContext } from '../../context/TreeContext';
import AddNode from './components/AddNode';

export const Index = () => {
  const treeContext = useContext(TreeContext);
  const [tree, setTree] = useState<TreeSchema>(treeContext.state.tree);
  const [node, setNode] = useState<RawNodeDatum | undefined>(undefined);
  const [nodeId, setNodeId] = useState<string | undefined>();

  function addNode(id: string, newNode?: TreeSchema) {
    const newNodeData: TreeSchema = {
      name: '',
      answerFieldType: 'InputBox',
      id: v4(),
      question: '',
      answers: [],
      children: [],
      url: '',
      answer: '',
    };
    const newTree = bfs(id, tree, newNode ? newNode : newNodeData);

    setTree(newTree);
    setNode(newNodeData);
  }

  function deleteNode(node: TreeSchema) {
    const newTree = deleteBfs(node.id, tree);
    setTree(newTree);
  }

  function editNode(node: TreeSchema) {
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
                // addNode(nodeDatum as unknown as TreeSchema);
                setNodeId((nodeDatum as unknown as TreeSchema).id);
              }}
            >
              Add
            </Button>
            {!Boolean(nodeDatum?.attributes?.firstNode) && (
              <Button
                onClick={() => {
                  deleteNode(nodeDatum as unknown as TreeSchema);
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
      <MenuComponent tree={tree} />
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
        currentNode={node as TreeSchema}
        isOpen={Boolean(node)}
        onClose={() => {
          setNode(undefined);
        }}
        onSubmit={() => {
          setNode(undefined);
        }}
        editNode={editNode}
      />
      <AddNode
        isOpen={Boolean(nodeId)}
        onClose={() => setNodeId(undefined)}
        addNodeMethod={(newNode?: TreeSchema) => {
          if (nodeId) addNode(nodeId, newNode);
        }}
      />
    </Box>
  );
};
