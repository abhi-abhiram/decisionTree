import { TreeProps } from "../Tree";

interface userInput {
  nodeName: string;
  question: string;
  userAns: string;
}

export const userInputObj: userInput[] = [];

function addInput(currentNode: TreeProps, ans: string) {
  userInputObj.push({
    nodeName: currentNode.name,
    question: currentNode.question,
    userAns: ans,
  });
}

export function generateDownloadLink() {
  const json = JSON.stringify(userInputObj);
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  return href;
}

export default addInput;
