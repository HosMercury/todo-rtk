import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useUsersQuery,
} from "../store/apis/todoApi";
import { TodoAdd } from "./TodoAdd";
import { UserTodos } from "./UserTodos";

export const TodoList = () => {
  const { isError, isLoading, data: users } = useUsersQuery();

  if (isLoading) return <p>Loading</p>;

  if (isError || !users) {
    return <div>Something went wrong</div>;
  }

  const renderedUsers = users.map((user) => (
    <div key={user.id}>
      <h2>{user.name}</h2>
      <UserTodos user={user} />
      <TodoAdd user={user} />
    </div>
  ));

  return <ul>{renderedUsers}</ul>;
};
