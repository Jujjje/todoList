import folderSlice from "./slices/folders/slice";
import itemsSlice from "./slices/items/slice";
import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./todosApi";

const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    items: itemsSlice,
    folders: folderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
