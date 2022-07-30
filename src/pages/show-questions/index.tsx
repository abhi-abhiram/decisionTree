import { Center, VStack, Button } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { emptyUserInputs, generateDownloadLink } from '../../utils/addInput';
import { FieldArray, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { Component } from './ReturnComponent';
import { TreeContext } from '../../context/TreeContext';
import { TreeSchema } from '../../../types/TreeTypes';
import { useNavigate } from 'react-router-dom';
import { getChild } from './SelectNode';
import { useAutoAnimate } from '@formkit/auto-animate/react';

let lastKey = 0;

const FormSchema = z.object({
  values: z.array(z.object({ nodeName: z.string(), answer: z.string() })),
});

const initialValues: z.infer<typeof FormSchema> = {
  values: [{ answer: '', nodeName: '' }],
};

const QuesAnsArray = ({
  values,
  isSubmitting,
}: {
  values: typeof initialValues;
  isSubmitting: boolean;
}) => {
  const treecontext = useContext(TreeContext);
  const [nodesQueue, setNodeQueue] = useState<TreeSchema[]>([
    treecontext.state.tree,
  ]);
  const [isTreeEnded, setIsTreeEnded] = useState(false);
  const [listref] = useAutoAnimate<HTMLDivElement>();

  return (
    <VStack w="50%" ref={listref}>
      <FieldArray name="values">
        {({ push, remove, pop }) => {
          return (
            <>
              {nodesQueue.map((value, index) => {
                return (
                  <Component
                    index={index}
                    node={value}
                    key={value.id}
                    isDisabled={Boolean(index !== nodesQueue.length - 1)}
                  />
                );
              })}
              {!isTreeEnded && (
                <Button
                  onClick={() => {
                    const lastIndex = nodesQueue.length - 1;
                    const child = getChild(
                      nodesQueue[lastIndex],
                      values.values[lastIndex].answer
                    );
                    if (child) {
                      setNodeQueue([...nodesQueue, child]);
                      push({ answer: '', nodeName: '' });
                    } else if (nodesQueue[lastIndex].children.length > 0) {
                      setNodeQueue([
                        ...nodesQueue,
                        nodesQueue[lastIndex].children[0],
                      ]);
                      push({ answer: '', nodeName: '' });
                    } else {
                      setIsTreeEnded(true);
                    }
                  }}
                >
                  Next
                </Button>
              )}
            </>
          );
        }}
      </FieldArray>
      {isTreeEnded && (
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      )}
    </VStack>
  );
};

const TreeJsx: React.FC = () => {
  const treecontext = useContext(TreeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!treecontext.state._id) navigate('/home');
  }, [navigate, treecontext]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
        }}
        validationSchema={toFormikValidationSchema(FormSchema)}
      >
        {({ values, isSubmitting }) => {
          return (
            <>
              <Form style={{ width: '100%' }}>
                <Center key={lastKey} w="100%">
                  <QuesAnsArray values={values} isSubmitting={isSubmitting} />
                </Center>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default TreeJsx;
