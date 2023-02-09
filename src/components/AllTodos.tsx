import React from "react";
import { useTodosQuery } from "../store/apis/todoApi";

export const AllTodos = () => {
  const { isError, isLoading, data: todos } = useTodosQuery();

  if (isLoading) return <p>Loading</p>;

  if (isError || !todos) {
    return <div>Something went wrong</div>;
  }

  const renderedTodos = todos.map((todo) => (
    <div key={todo.id}>
      <h2>{todo.name}</h2>
    </div>
  ));

  return <ul>{renderedTodos}</ul>;
};
