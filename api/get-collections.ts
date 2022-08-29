import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../db/db';

export default async function getData(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDB();
  const data = await db.collection('Collection').find().toArray();

  res.json(data);
}
