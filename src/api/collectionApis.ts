import axios from 'axios';
import { TreeNamesZodObj } from './manageTreeApis';

export const getCollectionName = async () => {
  const res = await axios.get('/api/get-collection-names');
  return TreeNamesZodObj.parse(res.data);
};
