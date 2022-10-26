import { AnswerFields, AnswersObj } from '../../../types/TreeTypes';

export interface TreeSchema {
  id: string;
  name: string;
  answerFieldType: AnswerFields;
  question: string;
  answers?: AnswersObj[];
  children: TreeSchema[];
  url?: string;
  parent?: { id: string };
  imgUrl?: string;
  helpText?: string;
}
