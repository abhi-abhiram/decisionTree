import { VercelRequest, VercelResponse } from '@vercel/node';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { connectToDB } from '../db/db';

const PayloadZ = z.object({
  collection: z.object({
    _id: z.string(),
    name: z.string(),
    nodes: z.array(
      z.object({
        treeName: z.string(),
        _id: z.string(),
      })
    ),
  }),
});

export default async function getData(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDB();
  const { collection } = PayloadZ.parse(req.body);

  const _id = new ObjectId(collection._id);

  await db.collection('Collection').updateOne(
    {
      _id,
    },
    {
      $set: {
        nodes: collection.nodes,
        name: collection.name,
        updatedAt: new Date(),
      },
    }
  );

  return res.json({ success: true, message: 'Updated Successfully' });
}
