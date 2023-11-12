import { IItem } from "./types";
import axios from "axios";

export const setNew = async (url: string, txt: string) => {
  const res = await axios.post(url, {
    id: "1",
    txt: txt,
    isDone: false,
  } as IItem);
  return res.data;
};
