import { createContext, useReducer } from 'react';
import { uid } from 'uid';
import { z } from 'zod';

export const AnswerFields = [
  'MultipleChoice',
  'Textarea',
  'SearchBox',
  'InputBox',
] as const;

export const answerFieldsEnum = z.enum(AnswerFields);

export type AnswerFieldsType = z.infer<typeof answerFieldsEnum>;

export interface TreeSchema {
  id: string;
  name: string;
  answerFieldType: AnswerFieldsType;
  question: string;
  answers?: string[];
  children: TreeSchema[];
  url?: string;
  answer?: string;
  parent?: TreeSchema;
}

export const treeSchema: z.ZodType<TreeSchema> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    answerFieldType: answerFieldsEnum,
    question: z.string(),
    answers: z.array(z.string()).optional(),
    children: z.array(treeSchema),
    url: z.string().optional(),
    answer: z.string().optional(),
    parent: treeSchema.optional(),
  })
);

type TreeContextProviderProps = {
  children: React.ReactNode;
};

export const TreeCollection = z.object({
  _id: z.string(),
  treeName: z.string(),
  tree: treeSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TreeCollectionType = z.infer<typeof TreeCollection>;

type ACTIONTYPES =
  | { type: 'set'; payload: TreeCollectionType }
  | { type: 'delete'; payload: string }
  | { type: 'update'; payload: TreeCollectionType };

const initailState: TreeCollectionType = {
  _id: '',
  treeName: '',
  tree: {
    name: 'root',
    answerFieldType: 'InputBox',
    id: uid(10),
    question: 'Question?',
    answers: [],
    children: [],
    url: '',
    answer: '',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const reducer = (prevState: TreeCollectionType, action: ACTIONTYPES) => {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'update':
      return action.payload;
    case 'delete':
      return initailState;
    default:
      return prevState;
  }
};

type TreeContextType = {
  state: TreeCollectionType;
  dispatch: React.Dispatch<ACTIONTYPES>;
};

export const TreeContext = createContext<TreeContextType | null>(null);

export const TreeContextProvider: React.FC<TreeContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initailState);
  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeContext.Provider>
  );
};
