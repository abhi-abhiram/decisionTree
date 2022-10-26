import {
  FormControl,
  FormLabel,
  VStack,
  Flex,
  ButtonGroup,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Formik, Form, FieldArray } from 'formik';
import { useMemo } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { z } from 'zod';
import FormInput from '../../../components/FormikComponents/FormInput';
import FormSelect from '../../../components/FormikComponents/FormSelect';
import { AnswersObj, TreeSchema } from '../../../../types/TreeTypes';
import { AnswerFields, AnswerFieldsZodObj } from '../../../zodObj/TreeObjs';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FormTextarea } from '../../../components/FormikComponents';

type Props = {
  currentNode: TreeSchema;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  Tree: TreeSchema;
  editNode: (node: TreeSchema) => void;
};

const NodeDataSchema = z.object({
  name: z.string(),
  answerFieldType: AnswerFieldsZodObj,
  question: z.string(),
  answers: z
    .array(
      z.object({
        answerValue: z.string(),
        childId: z.string().optional(),
      })
    )
    .optional(),
  url: z.string().optional(),
  imgUrl: z.string().optional(),
  helpText: z.string().optional(),
});

type FormSchema = z.infer<typeof NodeDataSchema>;

const initialValues: FormSchema = {
  answerFieldType: 'InputBox',
  name: '',
  question: '',
  answers: [{ answerValue: '', childId: '' }],
  url: '',
  imgUrl: '',
  helpText: '',
};

const AnswersField = ({ node }: { node: TreeSchema }) => {
  const [listref] = useAutoAnimate<HTMLDivElement>();
  return (
    <FieldArray name='answers'>
      {({ push, remove, form }) => {
        const { values } = form;

        return (
          <FormControl>
            <FormLabel textAlign={'center'}>Answers</FormLabel>
            <VStack ref={listref}>
              {values.answers?.length === 0 && (
                <IconButton
                  icon={<AddIcon />}
                  aria-label='Add'
                  m='0'
                  onClick={() => push('')}
                  alignSelf='flex-end'
                />
              )}
              {values.answers?.map((value: AnswersObj, index: number) => (
                <Flex key={index} w='100%'>
                  <FormInput name={`answers[${index}].answerValue`} />
                  <FormSelect
                    name={`answers[${index}].childId`}
                    placeholder='Select the Child'
                  >
                    {node.children.map((value, index) => {
                      return (
                        <option value={value.id} key={index}>
                          {value.name}
                        </option>
                      );
                    })}
                  </FormSelect>
                  <ButtonGroup colorScheme='green' ml='5px'>
                    <IconButton
                      icon={<AddIcon />}
                      aria-label='Add'
                      m='0'
                      onClick={() => push({ childId: '', answerValue: '' })}
                    />
                    <IconButton
                      icon={<MinusIcon />}
                      aria-label='Minus'
                      m='0'
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
  );
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
        imgUrl: currentNode.imgUrl,
        helpText: currentNode.helpText,
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
            onSubmit={(values, { setSubmitting }) => {
              try {
                editNode(mapFormValueToTreeSchema(values, currentNode));
              } catch (error) {
                console.error(error);
              }

              setSubmitting(false);
              onSubmit();
            }}
            validationSchema={toFormikValidationSchema(NodeDataSchema)}
          >
            {({ values, isSubmitting, errors }) => {
              return (
                <Form>
                  <VStack>
                    <FormInput name='name' placeholder='Node Name' />
                    <FormInput name='question' placeholder='Question' />
                    <FormSelect name='answerFieldType'>
                      <option value={AnswerFields[0]}>Multiple Choice</option>
                      <option value={AnswerFields[1]}>Textarea</option>
                      <option value={AnswerFields[2]}>Search Box</option>
                      <option value={AnswerFields[3]}>Input Box</option>
                    </FormSelect>
                    {values.answerFieldType === 'SearchBox' && (
                      <FormInput name='url' placeholder='URL' />
                    )}
                    <FormInput name='imgUrl' placeholder='Enter Image Url' />
                    <FormTextarea
                      name='helpText'
                      placeholder='Enter help text here'
                    />
                    <AnswersField node={currentNode} />
                    <Button
                      disabled={isSubmitting}
                      type='submit'
                      variant='solid'
                      colorScheme={'green'}
                    >
                      Save
                    </Button>
                  </VStack>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

function mapFormValueToTreeSchema(
  values: FormSchema,
  node: TreeSchema
): TreeSchema {
  return {
    id: node.id,
    name: values.name,
    answerFieldType: values.answerFieldType,
    children: node.children,
    question: values.question,
    answers: values.answers,
    url: values.url,
    imgUrl: values.imgUrl,
    helpText: values.helpText,
  };
}

export default NodeSettings;
