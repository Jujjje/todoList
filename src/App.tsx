import React from "react";
import Item from "./components/Item";
import Folder from "./components/Folder";
import ItemSkeleton from "./components/skeletons/ItemSkeleton";
import CreateInput from "./components/CreateInput";
import {
  useGetTasksQuery,
  useGetFoldersQuery,
  useGetFolderByIdQuery,
} from "./redux/todosApi";
import {useAppSelector} from "./redux/hooks";
import {selectFolder} from "./redux/slices/folders/slice";
import {IFolder, IItem} from "./components/types/types";
import CreateFolder from "./components/CreateFolder";

const App: React.FC = () => {
  const {activefolder} = useAppSelector(selectFolder);

  const {data: todos, isLoading: todosLoading} = useGetTasksQuery(activefolder);
  const {data: folders, isLoading: foldersLoading} = useGetFoldersQuery("");
  const {data: folder} = useGetFolderByIdQuery(activefolder);
  const activeFolderParams = folder
    ? {txt: folder.txt as string, color: folder.color as string}
    : "";
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
        <CreateFolder />
      </div>
      <div className="w-full ">
        <h4 className="m-14 text-4xl">{activeFolderParams.txt}</h4>
        {todoList()}
        {activefolder === "0" ? <></> : <CreateInput />}
      </div>
    </div>
  );
};

export default App;
