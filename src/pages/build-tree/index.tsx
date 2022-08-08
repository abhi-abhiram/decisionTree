import {
  RawNodeDatum,
  RenderCustomNodeElementFn,
} from 'react-d3-tree/lib/types/common';
import { Box, ButtonGroup, Button, Text, Checkbox } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { v4 } from 'uuid';
import NodeSettings from './components/NodeSettings';
import {
  addMultipleChilds,
  bfs,
  deleteBfs,
  editBfs,
} from './utils/nodeMethonds';
import MenuComponent from './components/Menu';
import { TreeSchema } from '../../../types/TreeTypes';
import { TreeContext } from '../../context/TreeContext';
import AddNode from './components/AddNode';
import Collection from './components/Collection';
import CollectionMenu from './components/CollectionMenu';
import TreeMenu from './components/SwitchToTree';

export const Index = () => {
  const treeContext = useContext(TreeContext);
  const [tree, setTree] = useState<TreeSchema>(treeContext.state.tree);
  const [node, setNode] = useState<RawNodeDatum | undefined>(undefined);
  const [nodeId, setNodeId] = useState<string | undefined>();
  const [collection, setCollection] = useState(new Set<TreeSchema>([]));
  const [showCheckBox, setShowCheckBox] = useState(false);

  useEffect(() => {
    setTree(treeContext.state.tree);
  }, [treeContext.state]);

  function addNode(
    id: string,
    props: { node?: TreeSchema; nodes?: TreeSchema[] }
  ) {
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

  const RenderCustomNode: RenderCustomNodeElementFn = ({ nodeDatum }) => {
    return (
      <>
        {showCheckBox && (
          <foreignObject
            x="-13"
            y="-60"
            width="200px"
            height="40px"
            style={{ padding: '5px' }}
          >
            <Checkbox
              m="auto"
              size="lg"
              onChange={(e) => {
                const currentNode = nodeDatum as unknown as TreeSchema;
                if (e.target.checked) {
                  collection.add(currentNode);
                  setCollection(new Set(collection));
                } else {
                  if (collection.has(currentNode)) {
                    collection.delete(currentNode);
                  }
                }
              }}
            />
          </foreignObject>
        )}

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
        <foreignObject x="10" y="10" width="150px" height="25px">
          <Text textAlign="left" fontWeight="semibold" marginLeft="10px">
            {nodeDatum.name}
          </Text>
        </foreignObject>
        {!showCheckBox && (
          <foreignObject x="10" y="30" width="150px" height="50px">
            <ButtonGroup alignSelf="center" size="sm" margin="10px 10px">
              <Button
                onClick={() => {
                  setNodeId((nodeDatum as unknown as TreeSchema).id);
                }}
              >
                Add
              </Button>
              {Boolean((nodeDatum as unknown as TreeSchema).parent) && (
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
        )}
      </>
    );
  };

  return (
    <Box w="100%" h="100vh">
      <MenuComponent tree={tree} showCheckBox={() => setShowCheckBox(true)} />
      <CollectionMenu />
      <TreeMenu />
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
      />
      <Collection
        isOpen={showCheckBox}
        onCancel={() => setShowCheckBox(false)}
        collection={collection}
      />
    </Box>
  );
};
