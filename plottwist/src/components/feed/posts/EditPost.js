import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";

const schema = yup.object().shape({
  title: yup.string().required("Please give your post a title"),
  body: yup.string(),
  media: yup.string(),
});

export default function EditPost() {
  const [post, setPost] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  let { id } = useParams();

  const url = `/social/posts/${id}`;

  useEffect(function () {
    async function getPost() {
      try {
        const response = await http.get(url);

        if (response.data.media === null) {
          response.data.media = "";
        }

        setPost(response.data);
      } catch (error) {
        setFetchError(error.toString());
        console.log(error);
      } finally {
        setFetchingPost(false);
      }
    }

    getPost();
  }, []);

  async function onSubmit(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);

    if (data.media === "") {
      data.media = null;
    }

    try {
      const response = await http.put(url, data);
      console.log("response", response.data);
      setUpdated(true);
    } catch (error) {
      setUpdateError(error.toString());
    } finally {
      setUpdatingPost(false);
    }
  }

  if (fetchingPost) return <div>Loading...</div>;

  if (fetchError) return <div>{fetchError}</div>;

  return (
    <div className='pageContainer'>
      <Heading title='Edit post' />

      <form onSubmit={handleSubmit(onSubmit)}>
        {updated && <div>The post was updated</div>}
        <label>
          Title
          <input {...register("title")} defaultValue={post.title} />
          {errors.title && <span>{errors.title.message}</span>}
        </label>
        <label>
          Body
          <textarea {...register("body")} defaultValue={post.body} />
        </label>
        <label>
          Media
          <input {...register("media")} defaultValue={post.media} />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
}
