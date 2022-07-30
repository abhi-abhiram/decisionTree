import { useField } from 'formik';
import { useEffect } from 'react';
import { TreeSchema } from '../../../types/TreeTypes';
import { FormTextarea, FromSelect } from '../../components/FormikComponents';
import FormInput from '../../components/FormikComponents/FormInput';

type Props = {
  node: TreeSchema;
  index: number;
  isDisabled: boolean;
};
export const Component: React.FC<Props> = ({ node, index, isDisabled }) => {
  const [, , helpers] = useField(`values[${index}].nodeName`);

  useEffect(() => {
    helpers.setValue(node.name);
  }, [node]);

  switch (node.answerFieldType) {
    case 'InputBox':
      return (
        <FormInput
          name={`values[${index}].answer`}
          label={node.question}
          isDisabled={isDisabled}
        />
      );
    case 'MultipleChoice':
      return (
        <FromSelect
          name={`values[${index}].answer`}
          label={node.question}
          options={{ values: node.answers }}
          isDisabled={isDisabled}
        />
      );
    case 'Textarea':
      return (
        <FormTextarea
          name={node.id}
          label={node.question}
          isDisabled={isDisabled}
        />
      );
  }
  return <></>;
};
