import { useCallback, useState } from "react";
import NodeJsx from "./selectNode";
import Tree, { TreeProps } from "../Tree";
import {
  Center,
  VStack,
  Divider,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import { userInputObj } from "../utils/addInput";

const TreeJsx: React.FC = () => {
  const [NodesQueue, setNodesQueue] = useState<TreeProps[]>([Tree]);
  const [screenSize] = useMediaQuery("(min-width:600px)");
  const [showSubmitButton, setSubmitButton] = useState(false);

  const returnNodes = useCallback(() => {
    return NodesQueue.map((Node, index) => {
      return (
        <NodeJsx
          {...{ Node, NodesQueue, setNodesQueue, setSubmitButton }}
          key={index}
        />
      );
    });
  }, [NodesQueue]);

  return (
    <Center>
      <VStack
        spacing="20px"
        divider={<Divider />}
        width={screenSize ? "45%" : "75%"}
      >
        {returnNodes()}
        {showSubmitButton ? (
          <Button onClick={() => console.log(userInputObj)}>Submit</Button>
        ) : null}
      </VStack>
    </Center>
  );
};

export default TreeJsx;
