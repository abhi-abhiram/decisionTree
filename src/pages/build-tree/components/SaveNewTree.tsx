import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { FormControl, FormLabel, Input, ButtonGroup } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import quesTree from '../../../Tree';
import FeedBack, { status } from './AlertDialog';

interface props {
  showModel: boolean;
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
  devTree: RawNodeDatum;
}

const messageObj = { status: status.SUCCESS, message: '' };
const SaveNewTree = ({ showModel, setShowModel, devTree }: props) => {
  const [Loading, setLoading] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);
  const onClose = () => setShowModel(false);
  const [showFeedBack, setFeedBack] = useState(false);

  return (
    <>
      <Modal isOpen={showModel} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tree is Valid</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name The Tree</FormLabel>
              <Input placeholder="" ref={input} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={() => {
                  setLoading(true);
                  axios
                    .post('/api/saveTree', {
                      name: input.current?.value,
                      quesTree,
                      devTree,
                    })
                    .then(({ data }) => {
                      setLoading(false);
                      if (data.success === true) {
                        messageObj.status = status.SUCCESS;
                        onClose();
                      } else {
                        messageObj.status = status.Error;
                      }
                      messageObj.message = data.message;
                      setFeedBack(true);
                    });
                }}
                type="submit"
                isLoading={Loading}
              >
                Save
              </Button>
              <Button onClick={onClose} colorScheme={'green'}>
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FeedBack
        messageObj={messageObj}
        setFeedBack={setFeedBack}
        showFeedBack={showFeedBack}
      />
    </>
  );
};

export default SaveNewTree;
