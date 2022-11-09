import {
  Center,
  VStack,
  Button,
  Spinner,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Divider,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { Component } from './ReturnComponent';
import { TreeContext } from '../../context/TreeContext';
import { TreeSchema } from './type';
import { useNavigate } from 'react-router-dom';
import { getChild } from './SelectNode';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import getWholeTree from '../../utils/getTree';
import { saveAs } from 'file-saver';
import Markdown from 'markdown-to-jsx';

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
  const [nodesQueue, setNodeQueue] = useState<TreeSchema[]>([]);
  const [isTreeEnded, setIsTreeEnded] = useState(false);
  const [listref] = useAutoAnimate<HTMLDivElement>();
  const [loading, setLoading] = useState(false);
  const [showHelpPanel, setHelpPanel] = useState(false);

  useEffect(() => {
    setLoading(true);

    getWholeTree({ ...treecontext.state.tree })
      .then((value) => {
        setLoading(false);
        return setNodeQueue([value as TreeSchema]);
      })
      .catch((error) => console.error(error));
  }, [treecontext.state.tree]);

  let helptext: string | undefined;
  if (nodesQueue.length && nodesQueue[nodesQueue.length - 1].helpText) {
    helptext = nodesQueue[nodesQueue.length - 1].helpText;
  }

  return (
    <>
      {!loading && (
        <VStack w='70%' ref={listref}>
          <FieldArray name='values'>
            {({ push, remove, pop, form }) => {
              const isError = Boolean(
                form.touched && Object.keys(form.errors).length !== 0
              );
              return (
                <>
                  {nodesQueue.map((value, index) => {
                    return (
                      <Component
                        index={index}
                        node={value}
                        key={value.id}
                        isDisabled={Boolean(index !== nodesQueue.length - 1)}
                        openHelpPanel={() => setHelpPanel(true)}
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
                      isDisabled={isError}
                    >
                      Next
                    </Button>
                  )}
                </>
              );
            }}
          </FieldArray>
          {isTreeEnded && (
            <Button type='submit' disabled={isSubmitting}>
              Submit
            </Button>
          )}
        </VStack>
      )}
      {loading && <Spinner />}
      <Drawer
        onClose={() => setHelpPanel(false)}
        isOpen={showHelpPanel}
        size={'lg'}
        placement={'left'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>help Panel</DrawerHeader>
          <DrawerBody>
            <Markdown
              options={{
                overrides: {
                  h1: {
                    component: Heading,
                    props: {
                      as: 'h1',
                      size: '3xl',
                    },
                  },
                  h2: {
                    component: Heading,
                    props: {
                      as: 'h2',
                      size: '2xl',
                    },
                  },
                  h3: {
                    component: Heading,
                    props: {
                      as: 'h3',
                      size: 'xl',
                    },
                  },
                  h4: {
                    component: Heading,
                    props: {
                      as: 'h4',
                      size: 'lg',
                    },
                  },
                  h5: {
                    component: Heading,
                    props: {
                      as: 'h5',
                      size: 'md',
                    },
                  },
                  h6: {
                    component: Heading,

                    props: {
                      as: 'h6',
                      size: 'sm',
                    },
                  },
                  p: {
                    component: Text,
                  },
                  strong: {
                    component: Text,
                    props: {
                      as: 'b',
                    },
                  },
                  em: {
                    component: Text,
                    props: {
                      as: 'em',
                    },
                  },
                  i: {
                    component: Text,
                    props: {
                      as: 'i',
                    },
                  },
                  u: {
                    component: Text,
                    props: {
                      as: 'u',
                    },
                  },
                  ul: {
                    component: UnorderedList,
                  },
                  li: {
                    component: ListItem,
                  },
                  ol: {
                    component: OrderedList,
                  },
                  hr: {
                    component: Divider,
                  },
                },
              }}
            >
              {helptext ? helptext : ''}
            </Markdown>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
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
          const blob = new Blob([JSON.stringify(values.values)], {
            type: 'octet-stream',
          });

          saveAs(URL.createObjectURL(blob), 'result.json');
          setSubmitting(false);
        }}
        validationSchema={toFormikValidationSchema(FormSchema)}
      >
        {({ values, isSubmitting }) => {
          return (
            <>
              <Form style={{ width: '100%' }}>
                <Center key={lastKey} w='100%'>
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
