export interface IItem {
  txt: string;
  isDone: boolean;
  id: string;
}
export interface IFolder {
  txt: string;
  color: string;
  content: string[];
  id: string;
}
