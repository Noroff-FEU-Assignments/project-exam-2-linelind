import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../layout/Heading";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  console.log(errors);

  return (
    <div className='pageContainer'>
      <Heading title='Login' />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input {...register("username")} />
          {errors.username && <span>{errors.username.message}</span>}
        </label>

        <label>
          Password
          <input {...register("password")} type='password' />
          {errors.password && <span>{errors.password.message}</span>}
        </label>

        <button>Log in</button>
        <a href='/register'>Create new account</a>
      </form>
    </div>
  );
}
