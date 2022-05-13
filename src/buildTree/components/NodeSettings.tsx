import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FormControl } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (txt: string) => void;
};

const NodeSettings: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [txt, setTxt] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Node Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl></FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="solid"
            onClick={() => onSubmit(txt)}
            disabled={!txt}
            colorScheme={"green"}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NodeSettings;
