import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 } from 'uuid';
import { TreeCollection, TreeSchema } from '../types/TreeTypes';
import { connectToDB } from '../db/db';

export default async function getData(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDB();
  const { collection, collectionName } = req.body as {
    collection: TreeSchema[];
    collectionName: string;
  };

  const rootNode: TreeSchema = {
    name: 'root',
    answerFieldType: 'MultipleChoice',
    children: collection,
    id: v4(),
    question: 'Select a node for testing',
    answers: collection.map((value, index) => {
      return { answerValue: value.name, childId: value.id };
    }),
  };

  const treeCollection: TreeCollection = {
    createdAt: new Date().toISOString(),
    isCollection: true,
    tree: rootNode,
    treeName: collectionName,
    updatedAt: new Date().toISOString(),
  };

  await db.collection('Tree').insertOne(treeCollection);

  return res.json({ success: true, message: 'New collection added' });
}
