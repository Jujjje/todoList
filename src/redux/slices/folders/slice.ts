import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  activefolder: "0",
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activefolder = action.payload;
    },
  },
});
export const { setActive } = foldersSlice.actions;

export const selectFolder = (state: RootState) => state.folders;

export default foldersSlice.reducer;
