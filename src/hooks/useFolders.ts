import {useQuery} from "react-query";
import todoServicec from "../servicec/todo.servicec";
export const useFolders = () => {
  return useQuery({
    queryKey: ["folders"],
    queryFn: () => todoServicec.getFolders(),
  });
};

export const useFoldersById = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => todoServicec.getFoldersById(id),
  });
};
