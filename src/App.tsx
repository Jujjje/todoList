import React from "react";
import Item from "./components/Item";
import Folder from "./components/Folder";
import ItemSkeleton from "./components/skeletons/ItemSkeleton";
import { IFolder } from "./redux/slices/folders/types";
import CreateInput from "./components/CreateInput";
import { useGetTasksQuery, useGetFoldersQuery } from "./redux/todosApi";
import { IItem } from "./redux/slices/items/types";

const App: React.FC = () => {
  const { data: todos, isLoading: todosLoading } = useGetTasksQuery("");
  const { data: folders, isLoading: foldersLoading } = useGetFoldersQuery("");
  const mainFolder: IFolder = {
    id: "0",
    txt: "Все задачи",
    color: "no",
    content: ["all"],
  };

  React.useEffect(() => {
    console.log([todos, folders]);
  }, [todos, folders]);

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
    <div className="flex flex-row min-h-screen">
      <div className="bg-[#F4F6F8]">
        <Folder key={mainFolder.id} {...mainFolder} />
        {folderList()}
      </div>
      <div className="w-full">
        {todoList()}
        <CreateInput />
      </div>
    </div>
  );
};

export default App;
