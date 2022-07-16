import { useField } from 'formik';
import {
  InputProps,
  FormLabelProps,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

interface Props extends InputProps {
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
  const [field, meta, helpers] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  return (
    <FormControl isInvalid={isError}>
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <Input {...field} {...props} />
      {isError && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
