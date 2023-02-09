import User from "../models/user";
import { Link } from "react-router-dom";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../store/apis/todoApi";
import { useUserTodosQuery } from "../store/apis/todoApi";
import Todo from "../models/todo";
import { faker } from "@faker-js/faker";

export const UserTodos = ({ user }: { user: User }) => {
  const { isError, isLoading, data: todos } = useUserTodosQuery(user.id);
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useUpdateTodoMutation();

  const handleEditTodo = (id: number) => {
    editTodo({ id, name: faker.commerce.product(), userId: user.id });
  };

  if (isLoading) return <p>Loading</p>;

  if (isError || !todos) {
    return <div>Something went wrong</div>;
  }

  const renderedTodos = todos.map((todo) => (
    <div key={todo.id}>
      <li>
        <Link to={`/${todo.id}`}>{todo.name}</Link>
        <button
          style={{ margin: "0.5rem" }}
          onClick={() => handleEditTodo(todo.id)}
        >
          Edit
        </button>
        <button style={{ margin: "0.5rem" }} onClick={() => deleteTodo(todo)}>
          Delete
        </button>
      </li>
    </div>
  ));

  return <ul>{renderedTodos}</ul>;
};
