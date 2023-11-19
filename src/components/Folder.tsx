import React, {CSSProperties} from "react";
import {selectFolder, setActive} from "../redux/slices/folders/slice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {
  useDelFolderMutation,
  useDelTaskMutation,
  useGetTasksQuery,
} from "../redux/todosApi";
import allTasks from "../assets/svgs/allTasks.svg";
import xCircle from "../assets/svgs/xCircle.svg";
import {IItem} from "./types/types";
interface IFolder {
  txt: string;
  id: string;
  color: string;
  content: string[];
}

const Folder: React.FC<IFolder> = ({id, txt, color}) => {
  const {activefolder} = useAppSelector(selectFolder);
  const dispatch = useAppDispatch();
  const [delFolder] = useDelFolderMutation();
  const [delTask] = useDelTaskMutation();
  const {data: todos} = useGetTasksQuery(activefolder);
  const handleFolder = () => {
    todos.map((i: IItem) => delTask(i.id));
    delFolder(activefolder);
  };
  return (
    <div
      onClick={() => dispatch(setActive(id))}
      className={
        activefolder === id
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
      {activefolder === id && activefolder !== "0" ? (
        <img
          src={xCircle}
          className="w-6 h-6 absolute right-1"
          onClick={() => handleFolder()}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Folder;
