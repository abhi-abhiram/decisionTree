import questionsTree, { TreeProps } from '../../../Tree';

export default function validateTree() {
  const queueQuestions: TreeProps[] = [];
  queueQuestions.unshift(questionsTree);

  const errorMessages: string[] = [];
  while (queueQuestions.length > 0) {
    const curQues = queueQuestions.pop();

    curQues?.answers?.forEach((ans, index) => {
      if (ans === '') {
        errorMessages.push(
          `At node ${curQues?.name} answer must be defined for child node ${
            curQues.children && curQues.children[index].name
          }`
        );
      }
    });

    if (
      curQues?.answerFieldType === 'textarea' ||
      curQues?.answerFieldType === 'searchBox' ||
      curQues?.answerFieldType === 'inputBox'
    ) {
      if ((curQues?.children?.length as number) > 1) {
        errorMessages.push(
          `At node ${curQues.name} for answer field ${curQues.answerFieldType} only one child is allowed`
        );
      }
    }

    if (!curQues?.question) {
      errorMessages.push(`
      At node ${curQues?.name} question can't be empty`);
    }

    const len = curQues?.children?.length;
    if (len && curQues.children) {
      for (let i = 0; i < len; i++) {
        queueQuestions.unshift(curQues.children[i]);
      }
    }
  }
  return errorMessages;
}
