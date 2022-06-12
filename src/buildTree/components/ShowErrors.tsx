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
import { Alert, AlertIcon, Stack, ButtonGroup } from "@chakra-ui/react";

interface props {
  showModel: boolean;
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
  ErrorMessages: string[];
}

const ShowErrors = ({ showModel, setShowModel, ErrorMessages }: props) => {
  const onClose = () => setShowModel(false);

  return (
    <>
      <Modal isOpen={showModel} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You have Entered invalid Tree</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              {ErrorMessages.map((mesg, index) => {
                return (
                  <Alert status="error" key={index}>
                    <AlertIcon />
                    {mesg}
                  </Alert>
                );
              })}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button onClick={onClose} colorScheme={"green"}>
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowErrors;
