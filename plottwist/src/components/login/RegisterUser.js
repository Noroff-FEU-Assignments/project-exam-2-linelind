import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../layout/Heading";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "You must enter at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Special caracters not allowed"),
  email: yup.string().required("Please enter an email address").email("Please enter a valid email"),
  password: yup.string().required("Please enter your first name").min(8, "You must enter at least 8 characters"),
  avatar: yup.string(),
  banner: yup.string(),
});

export default function RegisterUser() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    setSubmitted(true);
    reset();
  }

  return (
    <div className='pageContainer'>
      <Heading title='Create user' />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name*
          <input {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        <label>
          Email*
          <input {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label>
          Password*
          <input {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <label>
          Add avatar image by url
          <input {...register("avatar")} />
          {errors.avatar && <span>{errors.avatar.message}</span>}
        </label>
        <label>
          Add banner image by url
          <input {...register("banner")} />
          {errors.banner && <span>{errors.banner.message}</span>}
        </label>

        <button>Send</button>
      </form>
    </div>
  );
}
