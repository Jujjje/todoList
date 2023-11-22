import React from "react";
import {useUpdItemsMutation} from "../redux/todosApi";
import {selectFolder} from "../redux/slices/folders/slice";
import {useAppSelector} from "../redux/hooks";

const TaskCreator: React.FC = () => {
  const {activeFolder} = useAppSelector(selectFolder);
  const [addTask] = useUpdItemsMutation();
  const [isActiveForm, setIsActiveForm] = React.useState(true);
  const [value, setValue] = React.useState("");
  const handleSubmit = async (newTask: string) => {
    await addTask({txt: newTask, isDone: false, folderId: activeFolder});
  };

  return (
    <div className="flex flex-row items-center m-5">
      {isActiveForm ? (
        <svg
          className="m-4"
          onClick={() => setIsActiveForm(!isActiveForm)}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 1V15"
            stroke="#B4B4B4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 8H15"
            stroke="#B4B4B4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <></>
      )}

      {isActiveForm ? (
        <p className="font-semibold">Добавить задачу</p>
      ) : (
        <div className="flex flex-col gap-y-4">
          <input
            type="text"
            placeholder="Текст задачи"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            className="w-80 h-8 border p-4 rounded-[4px]"
          />
          <div className="flex gap-x-3">
            <input
              type="button"
              value="Добавить задачу"
              onClick={() => handleSubmit(value)}
              className="bg-[#4DD599]  text-white rounded-[4px] p-2 "
            />
            <input
              value="Отмена"
              onClick={() => setIsActiveForm(true)}
              type="button"
              className="bg-[#F4F6F8] text-[#9C9C9C] p-2 rounded-[4px]"
            ></input>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCreator;
