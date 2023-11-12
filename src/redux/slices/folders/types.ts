export interface IFolder {
  txt: string;
  color: string;
  content: string[];
  id: string;
}

export interface IInitialState {
  folders: IFolder[];
  folderLoadingStatus: boolean;
}
