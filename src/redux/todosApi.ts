import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  tagTypes: ["Tasks", "Folders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6532868fd80bd20280f5b584.mockapi.io",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `tasks`,
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
    }),
    updItems: builder.mutation({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const { useGetTasksQuery, useGetFoldersQuery, useUpdItemsMutation } =
  todosApi;
