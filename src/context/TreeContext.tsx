import { createContext, useReducer } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';
import { TreeCollection } from '../zodObj/TreeObjs';

type TreeContextProviderProps = {
  children: React.ReactNode;
};

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
    id: v4(),
    question: 'Question?',
    answers: [],
    children: [],
    url: '',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isCollection: false,
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

export const TreeContext = createContext<TreeContextType>({
  state: initailState,
  dispatch: () => initailState,
});

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
