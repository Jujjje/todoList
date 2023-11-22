import React from "react";
import {useUpdFoldersMutation} from "../redux/todosApi";
import plus from "../assets/svgs/plus.svg";
import xFullCircle from "../assets/svgs/xFullCircle.svg";
const FolderCreator = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [newFolderTxt, setNewFolderTxt] = React.useState("");
  const [addFolder] = useUpdFoldersMutation();
  const handleAdd = () => {
    addFolder({
      txt: newFolderTxt,
      color:
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
    });
    setIsEdit(!isEdit);
  };
  return (
    <div className="absolute m-5">
      {isEdit ? (
        <div className="flex flex-col bg-white p-4 shadow-md rounded-[10px] z-50">
          <input
            type="text"
            className="p-[4px] border-[1px] border-[#EFEFEF] rounded-[4px] w-52"
            value={newFolderTxt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewFolderTxt(e.target.value)
            }
            placeholder="Название папки"
          />
          <input
            type="button"
            className="bg-[#4DD599] text-white h-8 rounded-[4px] mt-4"
            value="Добавить"
            onClick={() => handleAdd()}
          />
          <img
            src={xFullCircle}
            className="absolute w-6 h-6 right-[-11px] top-[-11px]"
            onClick={() => setIsEdit(!isEdit)}
          />
        </div>
      ) : (
        <div className="flex items-center" onClick={() => setIsEdit(!isEdit)}>
          <img src={plus} className="m-4 w-6 h-6" />
          <p className="font-semibold">Создать папку</p>
        </div>
      )}
    </div>
  );
};

export default FolderCreator;
