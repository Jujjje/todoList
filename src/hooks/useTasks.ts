import {useQuery} from "react-query";
import todoServicec from "../servicec/todo.servicec";
export const useTasks = (activeFolder: string) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => todoServicec.getTasks(activeFolder),
  });
};
