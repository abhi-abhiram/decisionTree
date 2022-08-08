import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 } from 'uuid';
import { TreeCollection } from '../types/TreeTypes';
import { connectToDB } from '../db/db';

export default async function getData(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDB();
  const { treeName } = req.body;
  const newTree: TreeCollection = {
    treeName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tree: {
      name: '',
      answerFieldType: 'InputBox',
      id: v4(),
      question: 'Question?',
      answers: [],
      children: [],
      url: '',
      imgUrl: '',
    },
    isCollection: false,
  };

  await db.collection('Tree').insertOne(newTree);

  return res.json({ success: true, tree: newTree });
}
