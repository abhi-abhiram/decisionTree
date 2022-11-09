import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewTree } from '../../api/manageTreeApis';
import { TreeContext } from '../../context/TreeContext';

const NewCollectionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const initialRef = React.useRef<HTMLInputElement>(null);
  const finalRef = React.useRef(null);
  const treeContext = useContext(TreeContext);
  const [isLoadingCreateBtn, setLoadingCreateBtn] = useState(false);
  const navigateTo = useNavigate();

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter Tree Name</FormLabel>
              <Input ref={initialRef} placeholder='Tree Name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoadingCreateBtn}
              colorScheme='blue'
              mr={3}
              onClick={() => {
                if (initialRef.current?.value) {
                  setLoadingCreateBtn(true);
                  createNewTree(initialRef.current?.value).then((value) => {
                    treeContext?.dispatch({ type: 'set', payload: value });
                    setLoadingCreateBtn(false);
                    onClose();
                    navigateTo('/build-tree');
                  });
                }
              }}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewCollectionModal;
