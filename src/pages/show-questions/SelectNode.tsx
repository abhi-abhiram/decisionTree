import { TreeSchema } from '../../../types/TreeTypes';

export const getChild = (node: TreeSchema, ans: string) => {
  for (let child of node.children) {
    if (child.answer === ans) {
      return child;
    }
  }
};
