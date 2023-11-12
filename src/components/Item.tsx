import React from "react";
interface IItem {
  txt: string;
  isDone: boolean;
  id: string;
}
const Item: React.FC<IItem> = ({ txt, isDone }) => {
  const [doneStatus, setDoneStatus] = React.useState(isDone);
  return (
    <div className={`flex flex-row items-center m-5`}>
      {doneStatus ? (
        <div className="m-4">
          <svg
            onClick={() => setDoneStatus(!doneStatus)}
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
            onClick={() => setDoneStatus(!doneStatus)}
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

      <p className="font-normal break-words max-w">{txt}</p>
    </div>
  );
};

export default Item;
