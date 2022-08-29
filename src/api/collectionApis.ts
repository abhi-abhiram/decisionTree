import axios from 'axios';
import { z } from 'zod';
import { Collection } from '../../types/TreeTypes';
import { TreeNamesZodObj } from './manageTreeApis';

export const getCollectionName = async () => {
  const res = await axios.get('/api/get-collection-names');
  return TreeNamesZodObj.parse(res.data);
};

export const CollectionObj: z.ZodType<Collection> = z.object({
  _id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  nodes: z.array(
    z.object({
      treeName: z.string(),
      _id: z.string(),
    })
  ),
});

export const getCollection = async (id: string) => {
  const res = await axios.post('/api/get-collection', {
    id,
  });

  return CollectionObj.parse(res.data);
};

export const createCollection = async (
  name: string,
  nodes: { treeName: string; _id: string }[]
) => {
  const res = await axios.post<{ message: string; id: string }>(
    '/api/create-collection',
    {
      collection: {
        name,
        nodes,
      },
    }
  );
  return res;
};

export const getCollections = async () => {
  const res = await axios.get('/api/get-collections');
  return z.array(CollectionObj).parse(res.data);
};

type props = {
  _id: string;
  name: string;
  nodes: { treeName: string; _id: string }[];
};

export const updateCollection = async (input: props) => {
  const res = await axios.post('/api/update-collection', { collection: input });
  return res;
};

export const deleteCollection = async (id: string) => {
  const res = await axios.post('/api/delete-collection', { _id: id });
  return res;
};
