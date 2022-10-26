import { ObjectId } from 'mongodb';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../db/db';
import { TreeCollection } from '../types/TreeTypes';

export default async function getData(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDB();
  const _id = new ObjectId(req.body._id);
  const data = await db.collection<TreeCollection>('Tree').findOne({ _id });

  if (data) {
    data.treeName = `${data.treeName}-clone`;
    data._id = new ObjectId();

    await db.collection('Tree').insertOne(data);
  }
  res.json(data);
}
