import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IFolder, IInitialState } from "./types";

export const fetchFolders = createAsyncThunk(
  "folders/fetchFolders",
  async () => {
    const res = await axios.get(
      "https://6532868fd80bd20280f5b584.mockapi.io/folders"
    );
    return res.data as IFolder[];
  }
);
const initialState: IInitialState = {
  folders: [],
  folderLoadingStatus: true,
};

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.folderLoadingStatus = true;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.folderLoadingStatus = false;
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state) => {
        state.folders = [];
        state.folderLoadingStatus = true;
      });
  },
});

export default folderSlice.reducer;
