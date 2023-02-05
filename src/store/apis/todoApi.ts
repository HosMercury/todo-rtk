import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Todo from "../../models/todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  tagTypes: ["Todos"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints: (builder) => ({
    todos: builder.query<Todo[], void>({
      query: () => `/todos`,
      providesTags: [{ type: "Todos", id: "LIST" }],
    }),
    todo: builder.query<Todo, number>({
      query: (todoId: number) => `todos/${todoId}`,
      providesTags: (result, error, id) => [{ type: "Todos", id }],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (data: Todo) => ({
        url: `/todos`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Todo, { id: number; data: Partial<Todo> }>({
      query: ({ id, data }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "Todos", id: result.id },
              { type: "Todos", id: "LIST" },
            ]
          : [],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
      query: (todoId: number) => ({
        url: `/todos/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "Todos", id: result.id },
              { type: "Todos", id: "LIST" },
            ]
          : [],
    }),
  }),
});

export const {
  useTodosQuery,
  useTodoQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
export default todoApi;
