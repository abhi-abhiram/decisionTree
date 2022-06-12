import {
  Center,
  VStack,
  Divider,
  useMediaQuery,
  Button,
  ButtonGroup,
  Link,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import NodeJsx from "./selectNode";
import { TreeProps } from "../Tree";
import { emptyUserInputs, generateDownloadLink } from "../utils/addInput";
import { SelectTree } from "../components";

let lastKey = 0;
const TreeJsx: React.FC = () => {
  const [NodesQueue, setNodesQueue] = useState<TreeProps[]>([]);
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
    <>
      {NodesQueue.length === 0 && (
        <SelectTree showCreateButton={false} setNodesQueue={setNodesQueue} />
      )}
      <Center key={lastKey}>
        <VStack
          spacing="20px"
          divider={<Divider />}
          width={screenSize ? "45%" : "75%"}
        >
          {NodesQueue.length !== 0 && returnNodes()}
          <ButtonGroup
            alignSelf="stretch"
            justifyContent={"space-around"}
            size={screenSize ? "lg" : "md"}
          >
            {showSubmitButton ? (
              <Button
                as={Link}
                href={generateDownloadLink()}
                download={"userAns"}
                textDecoration={"none !important"}
              >
                Submit
              </Button>
            ) : null}
            {NodesQueue.length >= 2 ? (
              <Button
                onClick={() => {
                  lastKey++;
                  setNodesQueue((Tree) => [Tree[0]]);
                  setSubmitButton(false);
                  emptyUserInputs();
                }}
              >
                Reset
              </Button>
            ) : null}
          </ButtonGroup>
        </VStack>
      </Center>
    </>
  );
};

export default TreeJsx;
