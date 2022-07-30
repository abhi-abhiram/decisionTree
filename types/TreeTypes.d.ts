export type AnswerFields =
  | 'MultipleChoice'
  | 'Textarea'
  | 'SearchBox'
  | 'InputBox';

export interface TreeSchema {
  id: string;
  name: string;
  answerFieldType: AnswerFields;
  question: string;
  answers?: string[];
  children: TreeSchema[];
  url?: string;
  answer?: string;
  parent?: { answers?: string[] };
}

export type TreeCollection = {
  treeName: string;
  tree: TreeSchema;
  createdAt: string;
  updatedAt: string;
};
