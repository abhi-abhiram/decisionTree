import { TreeSchema } from '../../types/TreeTypes';
import { getTreeById } from '../api/manageTreeApis';

export default async function getWholeTree(tree: TreeSchema) {
  const queue: TreeSchema[] = [];
  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop() as TreeSchema;
    const len = curNode.children.length;

    for (let i = 0; i < len; i++) {
      if (!('children' in curNode.children[i])) {
        const id = curNode.children[i].id;
        const child = await getTreeById(id);
        curNode.children[i] = child.tree;
        curNode.answers?.forEach((value) => {
          if (value.childId === id) {
            value.childId = child.tree.id;
          }
        });
      }
      queue.unshift(curNode.children[i] as TreeSchema);
    }
  }
  return { ...tree };
}
