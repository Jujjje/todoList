import { setNew } from "./utils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IInitialState, IItem } from "./types";
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get(
    "https://6532868fd80bd20280f5b584.mockapi.io/tasks"
  );
  return res.data as IItem[];
});
const initialState: IInitialState = {
  items: [],
  loadingStatus: true,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    createNewTask: (_state, action: PayloadAction<string>) => {
      setNew(
        "https://6532868fd80bd20280f5b584.mockapi.io/tasks",
        action.payload
      );
      console.log("create");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.items = [];
        state.loadingStatus = true;
      });
  },
});
export const { createNewTask } = itemsSlice.actions;
export default itemsSlice.reducer;
