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
  const [curNode, setCurNode] = useState(curQues);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Node Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Stack padding="0 10px" divider={<Divider />}>
              <Box>
                <TagLabel fontWeight="semibold">Question</TagLabel>
                <Input
                  value={curNode.question}
                  onChange={(e) => {
                    curNode.question = e.target.value;
                    setCurNode({ ...curNode });
                  }}
                />
              </Box>
              <Box>
                <TagLabel fontWeight="semibold">Select Answer Field</TagLabel>
                <Select
                  value={curNode.answerFieldType}
                  onChange={(e) => {
                    curNode.answerFieldType = e.target.value as answerFields;
                    setCurNode({ ...curNode });
                  }}
                >
                  {answerFields.map((ans, index) => (
                    <option key={index}>{ans}</option>
                  ))}
                </Select>
              </Box>
              {curNode.answerFieldType === "searchBox" && (
                <Box>
                  <TagLabel fontWeight="semibold">Enter the api url</TagLabel>
                  <Input
                    type="url"
                    value={curNode.url}
                    onChange={(e) => {
                      curNode.url = e.target.value;
                      setCurNode({ ...curNode });
                    }}
                  ></Input>
                </Box>
              )}
              {curNode.answerFieldType === "multipleChoice" && (
                <Box>
                  <Stack direction="column">
                    <TagLabel fontWeight="semibold">Select Node</TagLabel>
                    {curNode.children?.map(({ name }, index) => {
                      return (
                        <Stack
                          key={index}
                          direction="row"
                          justifyContent="space-evenly"
                        >
                          <TagLabel alignSelf="center">{name}</TagLabel>
                          <Input
                            value={
                              curNode.answers ? curNode.answers[index] : ""
                            }
                            onChange={(e) => {
                              if (curNode.answers) {
                                curNode.answers[index] = e.target.value;
                                setCurNode({ ...curNode });
                              }
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
              )}
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="solid"
            onClick={() => {
              curQues.question = curNode.question;
              curQues.answerFieldType = curNode.answerFieldType;
              curQues.answers = curNode.answers;
              curQues.url = curNode.url;
              onSubmit();
            }}
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
