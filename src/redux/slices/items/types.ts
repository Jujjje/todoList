export interface IItem {
  txt: string;
  isDone: boolean;
  id: string;
}

export interface IInitialState {
  items: IItem[];
  loadingStatus: boolean;
}
