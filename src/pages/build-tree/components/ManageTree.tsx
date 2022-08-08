import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Input, VStack } from '@chakra-ui/react';
import { TreeSchema } from '../../../../types/TreeTypes';

type Props = {
  currentNode: TreeSchema;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  Tree: TreeSchema;
  editNode: (node: TreeSchema) => void;
};

const Manage = ({ isOpen, onClose, onSubmit, editNode }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>Node Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Input />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Manage;
