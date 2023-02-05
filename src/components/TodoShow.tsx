import { useParams } from "react-router-dom";
import { useTodoQuery } from "../store/apis/todoApi";

export const TodoShow = () => {
  const { id } = useParams();
  const { isError, isLoading, data: todo } = useTodoQuery(Number(id));
  if (!todo) return <h1>Loading...</h1>;

  return <div>{todo.name}</div>;
};
