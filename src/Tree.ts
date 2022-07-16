import { z } from 'zod';

export interface TreeProps {
  name: string;
  answerFieldType: answerFields;
  question: string;
  answers?: string[];
  children?: TreeProps[];
  url?: string;
}

const Tree: TreeProps = {
  name: '',
  answerFieldType: 'inputBox',
  question: '',
  answers: [],
  children: [],
};

export const answerFieldsValues = [
  'multipleChoice',
  'textarea',
  'searchBox',
  'inputBox',
] as const;

export const answerFieldsObj = z.enum(answerFieldsValues);

export type answerFields = z.infer<typeof answerFieldsObj>;

export default Tree;
