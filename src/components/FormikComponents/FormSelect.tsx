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
  options: { values: string[]; label?: string[] };
}

const FormInput: React.FC<Props> = ({
  name,
  label,
  formLabelProps,
  options,
  ...props
}) => {
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  return (
    <FormControl isInvalid={isError}>
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <Select {...field} {...props}>
        {options.values.map((value, index) => (
          <option key={index} value={value}>
            {options.label ? options.label[index] : value}
          </option>
        ))}
      </Select>
      {isError && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
