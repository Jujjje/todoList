import React from "react";
import {selectFolder} from "../redux/slices/folders/slice";
import {useAppSelector} from "../redux/hooks";
import plus from "../assets/svgs/plus.svg";
import {useCreateTask} from "../hooks/useMutations";

const TaskCreator: React.FC = () => {
  const {activeFolder} = useAppSelector(selectFolder);
  const [isActiveForm, setIsActiveForm] = React.useState(true);
  const [value, setValue] = React.useState("");
  const createTask = useCreateTask();
  const handleSubmit = async (txt: string, folderId: string) => {
    await createTask.mutate({txt, folderId});
    setValue("");
    setIsActiveForm(true);
  };

  return (
    <div className="flex flex-row items-center m-5">
      {isActiveForm ? (
        <>
          <img
            onClick={() => setIsActiveForm(!isActiveForm)}
            className="w-6 h-6 m-4"
            src={plus}
          />
          <p className="font-semibold">Добавить задачу</p>
        </>
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
              onClick={() => handleSubmit(value, activeFolder)}
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
