import { Button, IconButton } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Formik, Form, FieldArray } from 'formik';
import {
  FormControl,
  FormLabel,
  VStack,
  Flex,
  ButtonGroup,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { TreeStrc } from '../../../utils/types';
import { answerFieldsObj, answerFieldsValues } from '../../../Tree';
import { z } from 'zod';
import FormInput from '../../../components/FormikComponents/FormInput';
import FormSelect from '../../../components/FormikComponents/FormSelect';
import { useMemo } from 'react';

type Props = {
  currentNode: TreeStrc;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  Tree: TreeStrc;
  editNode: (node: TreeStrc) => void;
};

const NodeDataSchema = z.object({
  name: z.string(),
  answerFieldType: answerFieldsObj,
  question: z.string(),
  answers: z.array(z.string()).optional(),
  url: z.string().optional(),
  answer: z.string().optional(),
});

type FormSchema = z.infer<typeof NodeDataSchema>;

const initialValues: FormSchema = {
  answerFieldType: 'inputBox',
  name: '',
  question: '',
  answers: [],
  url: '',
};

const NodeSettings = ({
  isOpen,
  onClose,
  onSubmit,
  currentNode,
  editNode,
}: Props) => {
  const values: FormSchema = useMemo(() => {
    if (isOpen) {
      return {
        answerFieldType: currentNode.answerFieldType,
        name: currentNode.name,
        question: currentNode.question,
        answers: currentNode.answers,
        url: currentNode.url,
        answer: currentNode.answer,
      };
    } else {
      return initialValues;
    }
  }, [currentNode, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>Node Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={values}
            onSubmit={(values, { setSubmitting, validateForm, setErrors }) => {
              editNode(mapFormValueToTreeStrc(values, currentNode));
              setSubmitting(false);
              onSubmit();
            }}
            validationSchema={toFormikValidationSchema(NodeDataSchema)}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <VStack>
                  <FormInput name="name" placeholder="Node Name" />
                  <FormInput name="question" placeholder="Question" />
                  <FormSelect
                    name="answerFieldType"
                    options={{
                      values: [...answerFieldsValues],
                      label: [
                        'Multiple Choice',
                        'Textarea',
                        'Search Box',
                        'Input Box',
                      ],
                    }}
                  />
                  {currentNode.parent?.answers && (
                    <FormSelect
                      name="answer"
                      options={{
                        values: currentNode.parent.answers,
                      }}
                      placeholder="Select the answer"
                    />
                  )}
                  {values.answerFieldType === 'searchBox' && (
                    <FormInput name="url" placeholder="URL" />
                  )}
                  {
                    <FieldArray name="answers">
                      {({ push, remove }) => {
                        return (
                          <FormControl>
                            <FormLabel textAlign={'center'}>Answers</FormLabel>
                            <VStack>
                              {values.answers?.length === 0 && (
                                <IconButton
                                  icon={<AddIcon />}
                                  aria-label="Add"
                                  m="0"
                                  onClick={() => push('')}
                                  alignSelf="flex-end"
                                />
                              )}
                              {values.answers?.map((value, index) => (
                                <Flex key={index} w="100%">
                                  <FormInput name={`answers[${index}]`} />
                                  <ButtonGroup colorScheme="green" ml="5px">
                                    <IconButton
                                      icon={<AddIcon />}
                                      aria-label="Add"
                                      m="0"
                                      onClick={() => push('')}
                                    />
                                    <IconButton
                                      icon={<MinusIcon />}
                                      aria-label="Minus"
                                      m="0"
                                      onClick={() => remove(index)}
                                    />
                                  </ButtonGroup>
                                </Flex>
                              ))}
                            </VStack>
                          </FormControl>
                        );
                      }}
                    </FieldArray>
                  }
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="solid"
                    colorScheme={'green'}
                  >
                    Save
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

function mapFormValueToTreeStrc(values: FormSchema, node: TreeStrc): TreeStrc {
  return {
    id: node.id,
    name: values.name,
    answerFieldType: values.answerFieldType,
    children: node.children,
    question: values.question,
    answers: values.answers,
    url: values.url,
    answer: values.answer,
  };
}

export default NodeSettings;