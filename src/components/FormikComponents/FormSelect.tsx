import { useField } from 'formik';
import {
  SelectProps,
  FormLabelProps,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';

interface Props extends SelectProps {
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
      <Select {...props} {...field} />
      {isError && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
