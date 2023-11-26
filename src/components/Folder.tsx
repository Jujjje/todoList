import React, {CSSProperties} from "react";
import {selectFolder, setActive} from "../redux/slices/folders/slice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useDelFolderMutation, useDelTaskMutation} from "../redux/todosApi";
import allTasks from "../assets/svgs/allTasks.svg";
import x from "../assets/svgs/x.svg";
import {IFolder, IItem} from "./types/types";
import {useTasks} from "../hooks/useTasks";

const Folder: React.FC<IFolder> = ({id, txt, color}) => {
  const {activeFolder} = useAppSelector(selectFolder);
  const dispatch = useAppDispatch();
  const [delFolder] = useDelFolderMutation();
  const [delTask] = useDelTaskMutation();
  const {data: todos} = useTasks(activeFolder);
  const handleDel = () => {
    todos?.data.map((i: IItem) => delTask(i.id));
    delFolder(activeFolder);
  };
  function handleFolder(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      onClick={() => dispatch(setActive(id))}
      className={
        activeFolder === id
          ? "w-52 h-10 m-5 pl-3 flex flex-row items-center relative shadow-md bg-white rounded-[4px]"
          : "w-52 h-10 m-5 pl-3 flex flex-row items-center relative"
      }
    >
      {color === "no" ? (
        <img src={allTasks} className="mr-3" />
      ) : (
        <div
          className="bg-[var(--color)] w-3 h-3 mr-3 rounded-full"
          style={{"--color": color} as CSSProperties}
        ></div>
      )}

      <p className="font-bold truncate w-[9rem]">{txt}</p>
      {activeFolder === id && activeFolder !== "0" ? (
        <img
          src={x}
          className="w-6 h-6 absolute right-1"
          onClick={() => handleDel()}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Folder;
