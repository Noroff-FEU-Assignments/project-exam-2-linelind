import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { API_BASE } from "../../../constant/api";

const urlCreatePost = API_BASE + "/social/posts";

const schema = yup.object().shape({
  title: yup.string().required("Please give your post a title"),
  body: yup.string(),

  media: yup.string(),
});

export default function RegisterForm() {
  const [created, setCreated] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    setCreated(true);
    reset();
  }

  async function onSubmit(data) {
    setCreated(true);

    console.log(data);

    if (data.media === "") {
      data.media = null;
    }

    try {
      const response = await axios.post(urlCreatePost, data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setCreated(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title
        <input {...register("title")} />
        {errors.title && <span>{errors.title.message}</span>}
      </label>
      <label>
        Body
        <textarea {...register("body")} />
      </label>
      <label>
        Media
        <input {...register("media")} />
      </label>
      <button>Post</button>
    </form>
  );
}
