import {
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRef, useState } from 'react';
import { TreeSchema } from '../../../../types/TreeTypes';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  collection: Set<TreeSchema>;
}

const Collection: React.FC<Props> = ({ isOpen, onCancel, collection }) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  const { onOpen, onClose, ...extra } = useDisclosure();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={extra.isOpen}
        onClose={() => {
          onClose();
          onCancel();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter the name for collection</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setLoading(true);
                const name = initialRef.current?.value.trim();
                if (name) {
                  axios
                    .post('/api/create-collection', {
                      collection: Array.from(collection),
                      collectionName: name,
                    })
                    .then(() => {
                      setLoading(false);
                    });
                }
              }}
              isLoading={loading}
            >
              Create Collection
            </Button>
            <Button
              onClick={() => {
                onClose();
                onCancel();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isOpen && !extra.isOpen && (
        <ButtonGroup position="absolute" bottom="20px" right="30px">
          <Button onClick={onOpen}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default Collection;
