import { MongoClient, Document } from "mongodb";
import { VercelRequest, VercelResponse } from "@vercel/node";

const client = new MongoClient(
  "mongodb+srv://abhiram:ebGBhxU5cVvDHqAo@nodeexpressprojects.diw08.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const db = client.db("test");

interface T extends Document {
  name: number;
}

export default async function getData(req: VercelRequest, res: VercelResponse) {
  await client.connect();
  const data = await db
    .collection("Tree")
    .find<T>({}, { projection: { name: 1 } })
    .toArray();
  res.json(data);
}
