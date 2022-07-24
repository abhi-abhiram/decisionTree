import { MongoClient } from 'mongodb';

const client = new MongoClient(
  'mongodb+srv://abhiram:ebGBhxU5cVvDHqAo@nodeexpressprojects.diw08.mongodb.net/test?retryWrites=true&w=majority'
);

export const connectToDB = async () => {
  await client.connect();
  const db = client.db('test');
  return db;
};
