import { useState, useEffect } from "react";
import axios from "axios";

interface T {
  _id: string;
  name: string;
}

const useGetTrees = () => {
  const [trees, setTrees] = useState<T[]>();
  useEffect(() => {
    axios.get("/api/getAllTreeNames").then(({ data }) => setTrees(data));
  }, []);

  return trees;
};

export default useGetTrees;
