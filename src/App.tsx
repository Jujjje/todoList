import React from "react";
import Item from "./components/Item";
import Folder from "./components/Folder";
import ItemSkeleton from "./components/skeletons/ItemSkeleton";
import TaskCreator from "./components/TaskCreator";
import {useAppSelector} from "./redux/hooks";
import {selectFolder} from "./redux/slices/folders/slice";
import {IFolder, IItem} from "./components/types/types";
import FolderCreator from "./components/FolderCreator";
import {useTasks} from "./hooks/useTasks";
import {useFolders, useFoldersById} from "./hooks/useFolders";

const App: React.FC = () => {
  const {activeFolder} = useAppSelector(selectFolder);
  const {isLoading: todosLoading, data: todos} = useTasks(activeFolder);
  const {data: folders, isLoading: foldersLoading} = useFolders();
  const {data: folder} = useFoldersById(activeFolder);
  const activeFolderParams = {
    txt: folder?.data.txt as string,
    color: folder?.data.color as string,
  };

  const todoList = () => {
    return todosLoading ? (
      <ItemSkeleton />
    ) : (
      todos?.data.map((i: IItem) => <Item key={i.id} {...i} />)
    );
  };
  console.log(activeFolder);

  const folderList = () => {
    return foldersLoading ? (
      <ItemSkeleton />
    ) : (
      folders?.data.map((i: IFolder) => <Folder key={i.id} {...i} />)
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
