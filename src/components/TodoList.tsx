import {
  useTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../store/apis/todoApi";
import { faker } from "@faker-js/faker";
import Todo from "../models/todo";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export const TodoList = () => {
  const { isError, isLoading, data } = useTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useUpdateTodoMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(5, "Must be 5 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      handleAddTodo(values.name);
    },
  });

  if (isLoading) return <p>Loading</p>;

  if (isError || !data) {
    return <div>Something went wrong</div>;
  }

  const handleAddTodo = (name: string) => {
    console.log("handleAddTodo");

    addTodo({
      id: Math.floor(Math.random() * 1000000),
      name: name,
    });
  };

  const handleDeleteTodo = (todoIid: number) => {
    deleteTodo(todoIid);
  };

  const handleEditTodo = (id: number) => {
    editTodo({ id, data: { name: faker.commerce.product() } });
  };

  const renderedTodos = data.map((todo) => (
    <li key={todo.id}>
      {todo.id} :<Link to={`/${todo.id}`}>{todo.name}</Link>
      <button onClick={() => handleDeleteTodo(todo.id)}>X</button>
      <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
    </li>
  ));

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        Add Todo :
        <input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div style={{ color: "red" }}>{formik.errors.name}</div>
        ) : null}
      </form>
      <ul>{renderedTodos}</ul>
    </div>
  );
};
