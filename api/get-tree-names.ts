import { Document } from 'mongodb';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../db/db';

interface T extends Document {
  treeName: number;
  createdAt: number;
  updatedAt: number;
}

export default async function getData(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDB();
  const data = await db
    .collection('Tree')
    .find<T>({}, { projection: { treeName: 1, createdAt: 1, updatedAt: 1 } })
    .toArray();
  res.json(data);
}
