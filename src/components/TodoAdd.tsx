import * as Yup from "yup";
import { useFormik } from "formik";
import { faker } from "@faker-js/faker";
import { useAddTodoMutation } from "../store/apis/todoApi";
import User from "../models/user";

export const TodoAdd = ({ user }: { user: User }) => {
  const [addTodo] = useAddTodoMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(5, "Must be 5 characters or less")
        .required("Required"),
    }),
    onSubmit: ({ name }) => {
      addTodo({
        id: Math.floor(Math.random() * 1000000),
        name,
        userId: user.id,
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        Add Todo :
        <input {...formik.getFieldProps("name")} />
        {formik.touched.name && formik.errors.name ? (
          <p style={{ color: "red" }}>{formik.errors.name}</p>
        ) : null}
      </form>
    </>
  );
};
