import { ObjectId } from 'mongodb';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../db/db';

export default async function getData(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDB();

  const { _id, tree, treeName } = req.body;

  await db.collection('Tree').updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: { tree, treeName, updatedAt: new Date() },
    }
  );

  return res.json({ success: true, message: 'Updated successfully' });
}
