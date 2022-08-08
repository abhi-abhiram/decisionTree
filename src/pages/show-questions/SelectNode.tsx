import { AnswersObj, TreeSchema } from '../../../types/TreeTypes';

export const getChild = (node: TreeSchema, ans: string) => {
  const childId = getAnsObj(node.answers, ans);
  for (let child of node.children) {
    if (child.id === childId) {
      return child;
    }
  }
};

const getAnsObj = (answers: AnswersObj[] | undefined, ans: string) => {
  let ansIndex = 0;

  answers?.forEach((value, index) => {
    if (value.answerValue === ans) ansIndex = index;
  });

  if (answers && answers.length > 0) return answers[ansIndex].childId;
};
