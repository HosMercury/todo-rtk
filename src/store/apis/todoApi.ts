import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Todo from "../../models/todo";
import User from "../../models/user";

export const todoApi = createApi({
  reducerPath: "todoApi",
  tagTypes: ["Todo", "User", "UserTodos"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints: (builder) => ({
    todos: builder.query<Todo[], void>({
      query: () => `/todos`,
      providesTags: [{ type: "Todo", id: "LIST" }],
    }),
    todo: builder.query<Todo, number>({
      query: (todoId: number) => `todos/${todoId}`,
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (data: Todo) => ({
        url: `/todos`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, todo) => [
        { type: "UserTodos", id: todo.userId },
      ],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo: Todo) => ({
        url: `todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: (result, error, todo) => [
        { type: "UserTodos", id: todo.userId },
      ],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, Todo>({
      query: (todo: Todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, todo) => [
        { type: "UserTodos" as const, id: todo.userId },
      ],
    }),
    userTodos: builder.query<Todo[], number>({
      query: (userId: number) => {
        return {
          url: `/todos`,
          params: { userId },
          method: "GET",
        };
      },
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map((todo) => ({
                type: "UserTodos" as const,
                id: todo.userId,
              })),
              { type: "UserTodos", id: "LIST" },
            ]
          : [{ type: "UserTodos", id: "LIST" }],
    }),
    users: builder.query<User[], void>({
      query: () => `/users`,
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    user: builder.query<User, number>({
      query: (userId: number) => `users/${userId}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (data: User) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "Todo", id: result.id },
              { type: "User", id: "LIST" },
            ]
          : [],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (userId: number) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "User", id: result.id },
              { type: "User", id: "LIST" },
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
  useUserTodosQuery,
  useUsersQuery,
  useUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = todoApi;
export default todoApi;
