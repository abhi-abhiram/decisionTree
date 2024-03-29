import axios from 'axios';
import { z } from 'zod';
import { TreeSchema } from '../../types/TreeTypes';
import { TreeCollection } from '../zodObj/TreeObjs';

export const createNewTree = async (treeName: string) => {
  const { data } = await axios.post('/api/create-tree', {
    treeName,
  });

  return TreeCollection.parse(data.tree);
};

export const TreeNamesZodObj = z.array(
  z.object({
    _id: z.string(),
    treeName: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    isCollection: z.boolean().optional(),
  })
);

export const getTreesNames = async () => {
  const res = await axios.get('/api/get-all-tree-names');
  return TreeNamesZodObj.parse(res.data);
};

export const getOnlyTreeNames = async () => {
  const res = await axios.get('/api/get-tree-names');
  return TreeNamesZodObj.parse(res.data);
};

export const getTreeById = async (id: string) => {
  const { data } = await axios.post('/api/get-tree', { _id: id });
  return TreeCollection.parse(data);
};

export const deleteTreeById = async (id: string) => {
  await axios.post('/api/delete-tree', { _id: id });
};

export const changeTreeName = async (_id: string, treeName: string) => {
  await axios.post('/api/update-tree', {
    _id,
    treeName,
  });
};

export const cloneTree = async (_id: string) => {
  await axios.post('/api/clone-tree', {
    _id,
  });
};
