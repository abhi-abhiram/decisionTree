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
import { Alert, AlertIcon, Stack, Spinner, AlertTitle } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import quesTree from "../../Tree";
import validateTree from "../utils/validateTre";

const SumbitTree: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ErrorMessage, setErroMessage] = useState<string[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {ErrorMessage.length > 0
              ? "You have Entered invalid Tree"
              : "Tree is Valid"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {ErrorMessage.length > 0 && (
              <Stack spacing={3}>
                {ErrorMessage.map((mesg, index) => {
                  return (
                    <Alert status="error" key={index}>
                      <AlertIcon />
                      {mesg}
                    </Alert>
                  );
                })}
              </Stack>
            )}
            {ErrorMessage.length === 0 && (
              <>
                <Alert
                  status="success"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="200px"
                >
                  {Loading ? (
                    <Spinner size="lg" margin="0 auto" />
                  ) : (
                    <>
                      <AlertIcon boxSize="40px" mr={0} width="fit-content" />
                      <AlertTitle mt={4} mb={1} fontSize="lg">
                        Tree is successfully uploaded
                      </AlertTitle>
                    </>
                  )}
                </Alert>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)} colorScheme={"green"}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        position={"absolute"}
        bottom="50px"
        right="50px"
        onClick={() => {
          const result = validateTree();
          setIsOpen(true);
          setErroMessage(result.messages);
          if (result.isTreeValid) {
            setLoading(true);
            axios.post("/api/setTree", { Tree: quesTree }).then(({ data }) => {
              data.success === true && setLoading(false);
            });
          }
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default SumbitTree;
