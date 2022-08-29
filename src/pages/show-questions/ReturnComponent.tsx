import { useField } from 'formik';
import { useEffect } from 'react';
import { TreeSchema } from '../../../types/TreeTypes';
import { FormTextarea, FromSelect } from '../../components/FormikComponents';
import FormInput from '../../components/FormikComponents/FormInput';
import { Box, Divider, Image } from '@chakra-ui/react';

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

  console.log(node.imgUrl);
  switch (node.answerFieldType) {
    case 'InputBox':
      return (
        <Box w='100%' display='flex' alignItems='center' p={2}>
          <FormInput
            name={`values[${index}].answer`}
            label={node.question}
            isDisabled={isDisabled}
          />
          {node.imgUrl && (
            <Box display='flex'>
              <Divider orientation='vertical' h='auto' m='0 3rem' />
              <Image src={node.imgUrl} maxW='500px' />
            </Box>
          )}
        </Box>
      );
    case 'MultipleChoice':
      return (
        <Box w='100%' display='flex' alignItems='center' p={2}>
          <FromSelect
            name={`values[${index}].answer`}
            label={node.question}
            isDisabled={isDisabled}
            placeholder='Select an option'
          >
            {node.answers?.map((value, index) => {
              return (
                <option value={value.answerValue} key={index}>
                  {value.answerValue}
                </option>
              );
            })}
          </FromSelect>
          {node.imgUrl && (
            <Box display='flex'>
              <Divider orientation='vertical' h='auto' m='0 3rem' />
              <Image src={node.imgUrl} maxW='500px' />
            </Box>
          )}
        </Box>
      );
    case 'Textarea':
      return (
        <Box w='100%' display='flex' alignItems='center' p={2}>
          <FormTextarea
            name={`values[${index}].answer`}
            label={node.question}
            isDisabled={isDisabled}
          />
          {node.imgUrl && (
            <Box display='flex'>
              <Divider orientation='vertical' h='auto' m='0 3rem' />
              <Image src={node.imgUrl} maxW='500px' />
            </Box>
          )}
        </Box>
      );
  }
  return <></>;
};
