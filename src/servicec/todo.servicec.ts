import axios from "axios";
import {IFolder, IItem} from "../components/types/types";

class TodoServicec {
  async getTasks(folderId: string) {
    return axios.get<IItem[]>(
      `http://localhost:3000/tasks${
        folderId === "0" ? "?" : `?folderId=${folderId}`
      }`
    );
  }

  async getFolders() {
    return axios.get<IFolder[]>(`http://localhost:3000/folders`);
  }

  async getFoldersById(id: string) {
    return axios.get<IFolder>(`http://localhost:3000/folders/${id}`);
  }

  async setNewTask(txt: string, isDone: false, folderId: string) {
    return axios.post(`http://localhost:3000/tasks`, {
      txt,
      isDone,
      folderId,
    });
  }
}

export default new TodoServicec();
