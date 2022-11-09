import { v4 } from 'uuid';
import { Children, TreeSchema } from '../../../../types/TreeTypes';

export function bfs(id: string, tree: TreeSchema, node: TreeSchema) {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;

    if (curNode.id === id) {
      node.parent = { id: curNode.id };
      curNode.children.push(changeIds(node));
      break;
    }

    if ('children' in curNode) {
      const len = curNode.children.length;
      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i] as TreeSchema);
      }
    }
  }
  return { ...tree };
}

export function addMultipleChilds(
  id: string,
  tree: TreeSchema,
  nodes: Children
) {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;

    if (curNode.id === id) {
      const newNodes: Children = nodes.map((value) => {
        value.parent = { id: curNode.id };
        if ('children' in value) {
          return changeIds(value);
        } else {
          return value;
        }
      });
      curNode.children.push(...newNodes);
      break;
    }

    if ('children' in curNode) {
      const len = curNode.children.length;
      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i] as TreeSchema);
      }
    }
  }
  return { ...tree };
}

export function deleteBfs(id: string, tree: TreeSchema) {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;
    if ('children' in curNode) {
      const len = curNode.children.length;
      for (let i = 0; i < len; i++) {
        if (curNode.children[i].id === id) {
          curNode.children.splice(i, 1);
          break;
        }
        queue.unshift(curNode.children[i] as TreeSchema);
      }
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
      curNode.children.forEach((value) => {
        value.parent = { id: curNode.id };
      });
      curNode.imgUrl = node.imgUrl;
      curNode.helpText = node.helpText;
    }

    if ('children' in curNode) {
      const len = curNode.children.length;
      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i] as TreeSchema);
      }
    }
  }
  return { ...tree };
}

export function changeIds(tree: TreeSchema): TreeSchema {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;
    if ('children' in curNode) {
      curNode.id = v4();
    }

    if ('children' in curNode) {
      const len = curNode.children.length;
      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i] as TreeSchema);
      }
    }
  }

  return { ...tree };
}

export function getNode(id: string, tree: TreeSchema): TreeSchema | undefined {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);
  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;

    if (curNode.id === id) {
      return curNode;
    }

    if ('children' in curNode) {
      const len = curNode.children.length;
      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i] as TreeSchema);
      }
    }
  }
}

export function addParent(
  id: string,
  tree: TreeSchema,
  newNode: TreeSchema
): TreeSchema {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;

    if ('children' in curNode) {
      const len = curNode.children.length;
      for (let i = 0; i < len; i++) {
        const child = curNode.children[i];
        if (child.id === id) {
          if (newNode.parent && child.parent) {
            newNode.parent.id = child.parent?.id;
          }
          if (child.parent) {
            child.parent = { id: newNode.id };
          }
          newNode.children.push(child);
          curNode.children[i] = newNode;
          return { ...tree };
        }
        queue.unshift(child as TreeSchema);
      }
    }
  }
  return { ...tree };
}
