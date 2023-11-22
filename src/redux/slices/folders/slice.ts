import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";
interface IinitialState {
  activeFolder: string;
}

const initialState: IinitialState = {
  activeFolder: "0",
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      state.activeFolder = action.payload;
    },
  },
});
export const {setActive} = foldersSlice.actions;

export const selectFolder = (state: RootState) => state.folders;

export default foldersSlice.reducer;
