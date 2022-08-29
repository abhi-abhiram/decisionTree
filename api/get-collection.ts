import { ObjectId } from 'mongodb';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../db/db';

export default async function getData(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDB();
  const _id = new ObjectId(req.body.id);
  const data = await db.collection('Collection').findOne({ _id });
  res.json(data);
}
