import {useMutation, useQueryClient} from "react-query";
import todoServicec from "../servicec/todo.servicec";
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["todos"]});
    },
    mutationFn: ({txt, folderId}: {txt: string; folderId: string}) =>
      todoServicec.setNewTask(txt, false, folderId),
  });
};
