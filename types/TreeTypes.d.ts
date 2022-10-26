export type AnswerFields =
  | 'MultipleChoice'
  | 'Textarea'
  | 'SearchBox'
  | 'InputBox';

export interface AnswersObj {
  answerValue: string;
  childId?: string;
}

export type Children = (
  | TreeSchema
  | { name: string; id: string; parent?: { id: string } }
)[];

export interface TreeSchema {
  id: string;
  name: string;
  answerFieldType: AnswerFields;
  question: string;
  answers?: AnswersObj[];
  children: Children;
  url?: string;
  parent?: { id: string };
  imgUrl?: string;
  helpText?: string;
}

export type TreeCollection = {
  treeName: string;
  tree: TreeSchema;
  isCollection: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface Collection {
  _id: string;
  name: string;
  nodes: { treeName: string; _id: string }[];
  createdAt: string;
  updatedAt: string;
}
