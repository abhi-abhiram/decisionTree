import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import questionsTree, { TreeProps } from "../../Tree";

export default function bfs(
  name: string,
  tree: RawNodeDatum,
  deleteNode: boolean,
  getNode: boolean,
  node?: RawNodeDatum
) {
  const queue: RawNodeDatum[] = [];
  const queueQuestions: TreeProps[] = [];

  queue.unshift(tree);
  queueQuestions.unshift(questionsTree);

  while (queue.length > 0) {
    const curNode = queue.pop();
    const curQues = queueQuestions.pop();

    if (curNode?.name === name && getNode) {
      return curQues;
    } else if (curNode && deleteNode) {
      let isNodeFound = false;
      curNode.children?.forEach((child, index) => {
        if (child.name === name) {
          curNode.children?.splice(index, 1);
          curQues?.children?.splice(index, 1);
          curQues?.answers?.splice(index, 1);
          isNodeFound = true;
        }
      });
      if (isNodeFound) return { ...tree };
    } else if (curNode?.name === name && curNode && node) {
      curNode?.children?.push(node);
      curQues?.children?.push({
        name: node.name,
        question: "",
        answerFieldType: "inputBox",
        children: [],
        answers: [],
      });
      return { ...tree };
    }

    const len = curNode?.children?.length;

    if (len && curNode.children) {
      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i]);
        if (curQues?.children) queueQuestions.unshift(curQues.children[i]);
      }
    }
  }
}
