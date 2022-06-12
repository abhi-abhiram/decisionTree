import { MongoClient, ObjectId } from "mongodb";
import { VercelRequest, VercelResponse } from "@vercel/node";

const client = new MongoClient(
  "mongodb+srv://abhiram:ebGBhxU5cVvDHqAo@nodeexpressprojects.diw08.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const db = client.db("test");

export default async function getData(req: VercelRequest, res: VercelResponse) {
  await client.connect();
  const _id = new ObjectId(req.body._id);
  const data = await db.collection("Tree").findOne({ _id });
  res.json(data);
}
