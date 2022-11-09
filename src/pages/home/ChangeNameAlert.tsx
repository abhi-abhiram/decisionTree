import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { changeTreeName } from '../../api/manageTreeApis';
import FormInput from '../../components/FormikComponents/FormInput';

interface Props {
  isOpen: string;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ChangeNameAlert({ isOpen, onClose, onSubmit }: Props) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const submitRef = React.useRef<HTMLButtonElement>(null);
  const [isLoading, setLoading] = React.useState(false);

  return (
    <AlertDialog
      isOpen={Boolean(isOpen)}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Change Name
          </AlertDialogHeader>

          <AlertDialogBody>
            <Formik
              initialValues={{ name: '' }}
              onSubmit={(values, { setSubmitting }) => {
                setLoading(true);
                changeTreeName(isOpen, values.name).then(() => {
                  setLoading(false);
                  setSubmitting(false);
                  onClose();
                  onSubmit();
                });
              }}
              validationSchema={toFormikValidationSchema(
                z.object({
                  name: z.string({ required_error: "Name can't be empty" }),
                })
              )}
            >
              <Form>
                <FormInput name='name' label='Enter Tree Name' />
                <button type='submit' ref={submitRef} hidden></button>
              </Form>
            </Formik>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              ml={3}
              type='submit'
              onClick={() => {
                submitRef.current?.click();
              }}
              isLoading={isLoading}
            >
              Rename
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
