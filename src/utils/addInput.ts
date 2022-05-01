import { TreeProps } from "../Tree";

interface userInput {
  nodeName: string;
  question: string;
  userAns: string;
}

export const userInputObj: userInput[] = [];

function addInput(currentNode: TreeProps, ans: string) {
  let present = false;
  for (let count = 0; count < userInputObj.length; count++) {
    if (userInputObj[count].nodeName === currentNode.name) {
      present = true;
      for (let count2 = 0; count2 < userInputObj.length; count2++) {
        userInputObj.pop();
      }
      break;
    }
  }

  if (!present)
    userInputObj.push({
      nodeName: currentNode.name,
      question: currentNode.question,
      userAns: ans,
    });
}

export function updateInput(currentNode: TreeProps, ans: string) {
  userInputObj.forEach((input, index) => {
    if (currentNode.name === input.nodeName) {
      userInputObj[index].userAns = ans;
    }
  });
}

export default addInput;
