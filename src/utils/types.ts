import { answerFields } from '../Tree';

export interface TreeStrc {
  id: string;
  name: string;
  answerFieldType: answerFields;
  question: string;
  answers?: string[];
  children: TreeStrc[];
  url?: string;
  answer?: string;
  parent?: TreeStrc;
}
