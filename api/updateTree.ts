import { MongoClient, ObjectId } from "mongodb";
import { VercelRequest, VercelResponse } from "@vercel/node";

const client = new MongoClient(
  "mongodb+srv://abhiram:ebGBhxU5cVvDHqAo@nodeexpressprojects.diw08.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const db = client.db("test");

export default async function getData(req: VercelRequest, res: VercelResponse) {
  await client.connect();

  const { treeId, devTree, quesTree } = req.body;

  await db
    .collection("Tree")
    .updateOne({ _id: new ObjectId(treeId) }, { $set: { devTree, quesTree } });
  return res.json({ success: true, message: "Updated successfully" });
}
