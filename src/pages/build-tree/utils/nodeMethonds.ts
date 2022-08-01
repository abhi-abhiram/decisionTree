import { TreeSchema } from '../../../../types/TreeTypes';

export function bfs(id: string, tree: TreeSchema, node: TreeSchema) {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;

    if (curNode.id === id) {
      node.parent = { answers: curNode.answers };
      curNode.children.push(node);
      break;
    }
    const len = curNode.children.length;
    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i] as TreeSchema);
    }
  }
  return { ...tree };
}

export function deleteBfs(id: string, tree: TreeSchema) {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;
    const len = curNode.children.length;
    for (let i = 0; i < len; i++) {
      if (curNode.children[i].id === id) {
        curNode.children.splice(i, 1);
        break;
      }
      queue.unshift(curNode.children[i] as TreeSchema);
    }
  }

  return { ...tree };
}

export function editBfs(id: string, node: TreeSchema, tree: TreeSchema) {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);
  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;

    if (curNode.id === id) {
      curNode.name = node.name;
      curNode.answerFieldType = node.answerFieldType;
      curNode.question = node.question;
      curNode.answers = node.answers;
      curNode.children = node.children;
      curNode.url = node.url;
      curNode.answer = node.answer;
      curNode.children.forEach((value) => {
        value.parent = { answers: curNode.answers };
      });
    }
    const len = curNode.children.length;
    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i] as TreeSchema);
    }
  }
  return { ...tree };
}
