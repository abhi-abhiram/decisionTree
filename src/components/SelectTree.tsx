import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  Button,
  Select,
  ButtonGroup,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import Tree, { TreeProps } from "../Tree";
import getAllTrees from "../utils/getAllTrees";

interface props {
  showCreateButton: boolean;
  treeConfigObj?: {
    setTree: React.Dispatch<React.SetStateAction<RawNodeDatum>>;
    setTreeId: { _id: string };
  };
  setNodesQueue?: React.Dispatch<React.SetStateAction<TreeProps[]>>;
}

const SelectTree = ({
  showCreateButton,
  treeConfigObj,
  setNodesQueue,
}: props) => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  const trees = getAllTrees();
  const [loading, setLoading] = useState(false);
  const selectElement = useRef<HTMLSelectElement>(null);

  const onSelect = () => {
    setLoading(true);
    const index = selectElement.current?.selectedIndex;
    if (trees && index !== undefined) {
      const { _id } = trees[index];
      axios.post("/api/getTree", { _id }).then(({ data }) => {
        if (treeConfigObj) {
          treeConfigObj.setTree(data.devTree);
          treeConfigObj.setTreeId._id = data._id;
        } else if (setNodesQueue) {
          setNodesQueue([data.quesTree]);
        }
        Tree.name = data.quesTree.name;
        Tree.question = data.quesTree.question;
        Tree.url = data.quesTree.url;
        Tree.answerFieldType = data.quesTree.answerFieldType;
        Tree.answers = data.quesTree.answers;
        Tree.children = data.quesTree.children;
        setLoading(false);
        onClose();
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select The Tree</ModalHeader>
        <ModalBody pb={6}>
          {trees ? (
            <FormControl mt={4}>
              <Select ref={selectElement}>
                {trees?.map((value, index) => {
                  return (
                    <option
                      key={index}
                      className={`${index}`}
                      value={value.name}
                    >
                      {value.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            <Spinner margin={"auto"} />
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            {showCreateButton && (
              <Button onClick={onClose}>Create new tree</Button>
            )}
            <Button onClick={onSelect} disabled={!trees} isLoading={loading}>
              Continue
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectTree;
