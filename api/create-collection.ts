import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { connectToDB } from '../db/db';

const PayloadZ = z.object({
  collection: z.object({
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

  const newCollection = {
    ...collection,
    createdAt: new Date(),
    updatedAt: '',
  };

  const data = await db.collection('Collection').insertOne(newCollection);

  return res.json({
    success: true,
    message: 'New collection added',
    id: data.insertedId,
  });
}
