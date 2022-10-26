import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../db/db';
import { ObjectId } from 'mongodb';

export default async function getData(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDB();
  const _id = new ObjectId(req.body._id);

  await db
    .collection('Tree')
    .updateOne({ _id }, { $set: { treeName: req.body.treeName } });

  return res.status(201).json({ success: true, message: 'Delete successfull' });
}
