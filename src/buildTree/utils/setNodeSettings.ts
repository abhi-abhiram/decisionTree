import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import QuestionsTree, { TreeProps } from "../../Tree";

export default function setNodeSettings(node: RawNodeDatum) {
  const queue: TreeProps[] = [];

  queue.unshift(QuestionsTree);

  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode?.name === node.name && curNode && node) {
    }

    const len = curNode?.children?.length;

    if (len && curNode.children) {
      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i]);
      }
    }
  }
}
