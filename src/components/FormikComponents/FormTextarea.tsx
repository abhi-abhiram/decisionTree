import { useField } from 'formik';
import {
  TextareaProps,
  FormLabelProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';

interface Props extends TextareaProps {
  name: string;
  formLabelProps?: FormLabelProps;
  label?: string;
}

const FormInput: React.FC<Props> = ({
  name,
  label,
  formLabelProps,
  ...props
}) => {
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  return (
    <FormControl isInvalid={isError}>
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <Textarea {...field} {...props} />
      {isError && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
