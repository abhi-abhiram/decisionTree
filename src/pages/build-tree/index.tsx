import {
  RawNodeDatum,
  RenderCustomNodeElementFn,
} from 'react-d3-tree/lib/types/common';
import { Box, ButtonGroup, Button, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { v4 } from 'uuid';
import NodeSettings from './components/NodeSettings';
import {
  addMultipleChilds,
  addParent,
  bfs,
  deleteBfs,
  editBfs,
} from './utils/nodeMethonds';
import MenuComponent from './components/Menu';
import { Children, TreeSchema } from '../../../types/TreeTypes';
import { TreeContext } from '../../context/TreeContext';
import AddNode from './components/AddNode';

export const Index = () => {
  const treeContext = useContext(TreeContext);
  const [tree, setTree] = useState<TreeSchema>(treeContext.state.tree);
  const [node, setNode] = useState<RawNodeDatum | undefined>(undefined);
  const [nodeId, setNodeId] = useState<string | undefined>();

  useEffect(() => {
    setTree(treeContext.state.tree);
  }, [treeContext.state]);

  function addNode(id: string, props: { node?: TreeSchema; nodes?: Children }) {
    let newTree: TreeSchema;
    if (props.node) {
      newTree = bfs(id, tree, props.node);
    } else if (props.nodes) {
      newTree = addMultipleChilds(id, tree, props.nodes);
    } else {
      const newNodeData: TreeSchema = {
        name: '',
        answerFieldType: 'InputBox',
        id: v4(),
        question: '',
        answers: [],
        children: [],
        url: '',
        imgUrl: '',
      };
      newTree = bfs(id, tree, newNodeData);

      setNode(newNodeData);
    }
    setTree(newTree);
  }

  function deleteNode(node: TreeSchema) {
    const newTree = deleteBfs(node.id, tree);
    setTree(newTree);
  }

  function editNode(node: TreeSchema) {
    const newTree = editBfs(node.id, node, tree);
    setTree(newTree);
  }

  function addParentNode(id: string) {
    let newTree: TreeSchema;
    const newNodeData: TreeSchema = {
      name: '',
      answerFieldType: 'InputBox',
      id: v4(),
      question: '',
      answers: [],
      children: [],
      url: '',
      imgUrl: '',
      parent: { id: '' },
    };
    newTree = addParent(id, tree, newNodeData);
    setNode(newNodeData);
    setTree(newTree);
  }

  const RenderCustomNode: RenderCustomNodeElementFn = ({ nodeDatum }) => {
    return (
      <>
        <circle
          r='25'
          color=''
          stroke='none'
          fill='var(--chakra-colors-green-500)'
          style={{
            stroke: 'none',
          }}
          onClick={() => {
            if (('children' in nodeDatum) as unknown as Children) {
              setNode(nodeDatum);
            }
          }}
        />
        <foreignObject x='10' y='10' width='150px' height='25px'>
          <Text textAlign='left' fontWeight='semibold' marginLeft='10px'>
            {nodeDatum.name}
          </Text>
        </foreignObject>

        <foreignObject x='10' y='30' width='150px' height='50px'>
          <ButtonGroup alignSelf='center' size='sm' margin='10px 10px'>
            {(('children' in nodeDatum) as unknown as Children) && (
              <Button
                onClick={() => {
                  setNodeId((nodeDatum as unknown as TreeSchema).id);
                }}
              >
                Add
              </Button>
            )}

            {Boolean((nodeDatum as unknown as TreeSchema).parent) && (
              <Button
                onClick={() => {
                  deleteNode(nodeDatum as unknown as TreeSchema);
                }}
                color='red.600'
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
    <Box w='100%' h='100vh'>
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
        addNodeMethod={(props) => {
          if (nodeId) addNode(nodeId, props);
        }}
        addParent={() => {
          if (nodeId) addParentNode(nodeId);
        }}
      />
    </Box>
  );
};
