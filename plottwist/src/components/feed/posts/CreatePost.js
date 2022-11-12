import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
  title: yup.string().required("Please give your post a title"),
  body: yup.string(),
  media: yup.string(),
  tags: yup.string(),
});

export default function RegisterForm() {
  const [created, setCreated] = useState(false);
  const [postError, setPostError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const urlCreatePost = useAxios();

  async function onSubmit(data) {
    if (data.media === "") {
      data.media = null;
    }

    if (data.tags === "") {
      data.tags = [];
    }

    try {
      const response = await urlCreatePost.post("/social/posts", data);
      setCreated(true);
      window.location.reload();
    } catch (error) {
      setPostError(error.toString());
    } finally {
      setCreated(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {postError && <div>{postError}</div>}
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
      <label>
        Tags
        <input {...register("tags")} />
      </label>
      <button>Post</button>
    </form>
  );
}
