import React from "react";
import Item from "./components/Item";
import Folder from "./components/Folder";
import ItemSkeleton from "./components/skeletons/ItemSkeleton";
import TaskCreator from "./components/TaskCreator";
import {
  useGetTasksQuery,
  useGetFoldersQuery,
  useGetFolderByIdQuery,
} from "./redux/todosApi";
import {useAppSelector} from "./redux/hooks";
import {selectFolder} from "./redux/slices/folders/slice";
import {IFolder, IItem} from "./components/types/types";
import FolderCreator from "./components/FolderCreator";

const App: React.FC = () => {
  const {activeFolder} = useAppSelector(selectFolder);

  const {data: todos, isLoading: todosLoading} = useGetTasksQuery(activeFolder);
  const {data: folders, isLoading: foldersLoading} = useGetFoldersQuery("");
  const {data: folder} = useGetFolderByIdQuery(activeFolder);
  const activeFolderParams = {
    txt: folder?.txt as string,
    color: folder?.color as string,
  };

  const todoList = () => {
    return todosLoading ? (
      <ItemSkeleton />
    ) : (
      todos.map((i: IItem) => <Item key={i.id} {...i} />)
    );
  };

  const folderList = () => {
    return foldersLoading ? (
      <ItemSkeleton />
    ) : (
      folders.map((i: IFolder) => <Folder key={i.id} {...i} />)
    );
  };

  return (
    <div className="flex flex-row min-h-screen relative">
      <div className="bg-[#F4F6F8]">
        {folderList()}
        <FolderCreator />
      </div>
      <div className="w-full ">
        <h4 className="m-14 text-4xl">{activeFolderParams.txt}</h4>
        {todoList()}
        {activeFolder === "0" ? <></> : <TaskCreator />}
      </div>
    </div>
  );
};

export default App;
