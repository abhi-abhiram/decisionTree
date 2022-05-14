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
import {
  FormControl,
  Input,
  TagLabel,
  Stack,
  Divider,
  Select,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TreeProps, answerFields } from "../../Tree";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  curQues: TreeProps;
};

const NodeSettings: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  curQues,
}) => {
  const [txt, setTxt] = useState(curQues.question);
  const [, setReRender] = useState<boolean>(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Node Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl onChange={() => setReRender((value) => !value)}>
            <Stack padding="0 10px" divider={<Divider />}>
              <Box>
                <TagLabel fontWeight="semibold">Question Name</TagLabel>
                <Input value={txt} onChange={(e) => setTxt(e.target.value)} />
              </Box>
              <Box>
                <TagLabel fontWeight="semibold">Select Answer Field</TagLabel>
                <Select
                  value={curQues.answerFieldType}
                  onChange={(e) =>
                    (curQues.answerFieldType = e.target.value as answerFields)
                  }
                >
                  {answerFields.map((ans, index) => (
                    <option key={index}>{ans}</option>
                  ))}
                </Select>
              </Box>
              <Box>
                <Stack direction="column">
                  <TagLabel fontWeight="semibold">Select Node</TagLabel>
                  {curQues.children?.map(({ name }, index) => {
                    return (
                      <Stack direction="row" justifyContent="space-evenly">
                        <TagLabel alignSelf="center">{name}</TagLabel>
                        <Input
                          value={curQues.answers ? curQues.answers[index] : ""}
                          onChange={(e) => {
                            if (curQues.answers)
                              curQues.answers[index] = e.target.value;
                          }}
                          alignSelf="center"
                          maxWidth="200px"
                          size="sm"
                        />
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="solid"
            onClick={() => {
              curQues.question = txt;
              onSubmit();
            }}
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
