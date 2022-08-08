export type AnswerFields =
  | 'MultipleChoice'
  | 'Textarea'
  | 'SearchBox'
  | 'InputBox';

export interface AnswersObj {
  answerValue: string;
  childId?: string;
}

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
}

export type TreeCollection = {
  treeName: string;
  tree: TreeSchema;
  isCollection: boolean;
  createdAt: string;
  updatedAt: string;
};
