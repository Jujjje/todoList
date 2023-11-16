import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  tagTypes: ["Tasks", "Folders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (folderId) =>
        `tasks?${folderId === "0" ? "" : `folderId=${folderId}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "Tasks" as const,
                id,
              })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    getFolders: builder.query({
      query: () => `folders`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "Folder" as const,
                id,
              })),
              { type: "Folder", id: "Folder" },
            ]
          : [{ type: "Folders", id: "Folder" }],
    }),
    getFolderById: builder.query({
      query: (id) => `folders/${id}`,
    }),
    updItems: builder.mutation({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    delTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    editTask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetFoldersQuery,
  useUpdItemsMutation,
  useDelTaskMutation,
  useEditTaskMutation,
  useGetFolderByIdQuery,
} = todosApi;
