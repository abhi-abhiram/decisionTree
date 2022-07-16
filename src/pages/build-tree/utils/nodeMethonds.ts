import { TreeStrc } from '../../../utils/types';

export function bfs(id: string, tree: TreeStrc, node: TreeStrc) {
  const queue: TreeStrc[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeStrc;

    if (curNode.id === id) {
      node.parent = curNode;
      curNode.children.push(node);
    }
    const len = curNode.children.length;
    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i] as TreeStrc);
    }
  }
  return { ...tree };
}

export function deleteBfs(id: string, tree: TreeStrc) {
  const queue: TreeStrc[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeStrc;
    const len = curNode.children.length;
    for (let i = 0; i < len; i++) {
      if (curNode.children[i].id === id) {
        curNode.children.splice(i, 1);
        break;
      }
      queue.unshift(curNode.children[i] as TreeStrc);
    }
  }

  return { ...tree };
}

export function editBfs(id: string, node: TreeStrc, tree: TreeStrc) {
  const queue: TreeStrc[] = [];
  queue.unshift(tree);
  while (queue.length > 0) {
    const curNode = queue.pop() as TreeStrc;

    if (curNode.id === id) {
      curNode.name = node.name;
      curNode.answerFieldType = node.answerFieldType;
      curNode.question = node.question;
      curNode.answers = node.answers;
      curNode.children = node.children;
      curNode.url = node.url;
      curNode.answer = node.answer;
      curNode.children.forEach((value) => {
        value.parent = curNode;
      });
    }
    const len = curNode.children.length;
    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i] as TreeStrc);
    }
  }
  return { ...tree };
}
