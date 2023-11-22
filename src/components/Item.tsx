import React from "react";
import {useDelTaskMutation, useEditTaskMutation} from "../redux/todosApi";
import markDone from "../assets/svgs/markDone.svg";
import markNoDone from "../assets/svgs/markNoDone.svg";
import {IItem} from "./types/types";
import x from "../assets/svgs/x.svg";
import pen from "../assets/svgs/pen.svg";

const Item: React.FC<IItem> = ({id, txt, isDone}) => {
  const [delTask] = useDelTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [doneStatus, setDoneStatus] = React.useState(isDone);
  const [isItemHover, setIsItemHover] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editTxt, setEditTxt] = React.useState(txt);

  const handleDel = async (id: string) => {
    await delTask(id);
  };
  const handleEdit = async () => {
    await editTask({txt: editTxt, id});
    setIsEdit(false);
  };
  const handleStatus = async () => {
    setDoneStatus(!doneStatus);
    await editTask({id, isDone: !doneStatus});
  };

  return (
    <div
      onMouseOver={() => setIsItemHover(true)}
      onMouseOut={() => setIsItemHover(false)}
      className={`flex flex-row items-center m-5 relative`}
    >
      {doneStatus ? (
        <div className="m-4">
          <img
            src={markNoDone}
            onClick={() => {
              handleStatus();
            }}
          />
        </div>
      ) : (
        <div className="m-4" onClick={() => handleStatus()}>
          <img src={markDone} />
        </div>
      )}

      {isEdit ? (
        <input
          type="text"
          placeholder="Текст задачи"
          value={editTxt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditTxt(e.target.value)
          }
          onBlur={() => handleEdit()}
          className="h-8 border p-4 rounded-[4px] w-[60rem]"
        />
      ) : (
        <p className="font-normal break-words w-[60rem]">{editTxt}</p>
      )}

      <div className={isItemHover ? "flex absolute right-0" : "hidden"}>
        <img src={pen} onClick={() => setIsEdit(!isEdit)} />
        <img src={x} onClick={() => handleDel(id)} />
      </div>
    </div>
  );
};

export default Item;
