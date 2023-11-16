import React from "react";
import { useDelTaskMutation, useEditTaskMutation } from "../redux/todosApi";
interface IItem {
  txt: string;
  isDone: boolean;
  id: string;
}
const Item: React.FC<IItem> = ({ id, txt, isDone }) => {
  const [delTask] = useDelTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [doneStatus, setDoneStatus] = React.useState(isDone);
  const [isItemHover, setIsItemHover] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editTxt, seteditTxt] = React.useState(txt);

  const handleDel = async (id: string) => {
    await delTask(id);
  };
  const handleEdit = async () => {
    await editTask({ txt: editTxt, id });
    setIsEdit(false);
  };
  const handleStatus = async () => {
    setDoneStatus(!doneStatus);
    await editTask({ id, isDone: !doneStatus });
  };

  return (
    <div
      onMouseOver={() => setIsItemHover(true)}
      onMouseOut={() => setIsItemHover(false)}
      className={`flex flex-row items-center m-5 relative`}
    >
      {doneStatus ? (
        <div className="m-4">
          <svg
            onClick={() => {
              handleStatus();
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle
              cx="10"
              cy="10"
              r="9"
              fill="#4DD599"
              stroke="#4DD599"
              strokeWidth="2"
            />
            <path
              d="M14.3 7.20001L8.80005 12.7L6.30005 10.2"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <div className="m-4">
          <svg
            onClick={() => handleStatus()}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle cx="10" cy="10" r="9" stroke="#E8E8E8" strokeWidth="2" />
          </svg>
        </div>
      )}

      {isEdit ? (
        <input
          type="text"
          placeholder="Текст задачи"
          value={editTxt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            seteditTxt(e.target.value)
          }
          onBlur={() => handleEdit()}
          className="h-8 border p-4 rounded-[4px] w-[60rem]"
        />
      ) : (
        <p className="font-normal break-words w-[60rem]">{editTxt}</p>
      )}

      <div className={isItemHover ? "flex absolute right-0" : "hidden"}>
        <svg
          onClick={() => setIsEdit(!isEdit)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
        <svg
          onClick={() => handleDel(id)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default Item;
