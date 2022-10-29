import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../layout/Heading";

const schema = yup.object().shape({
  email: yup.string().required("Please enter your registered email").email("Please enter a valid email"),
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
          User email
          <input {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
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
