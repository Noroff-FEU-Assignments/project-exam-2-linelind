import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import DeletePostButton from "./DeletePostButton";

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

  const history = useNavigate();
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
      } finally {
        setFetchingPost(false);
      }
    }

    getPost();
  }, []);

  async function editPost(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);

    const EditTitle = data.title;
    const EditMessage = data.body;
    const EditMedia = data.media;
    const editTagsData = data.tags;
    const editSplitTags = editTagsData.split(" ");

    if (data.media === "") {
      data.media = null;
    }

    const formData = {
      title: EditTitle,
      body: EditMessage,
      media: EditMedia,
      tags: editSplitTags,
    };

    try {
      const response = await http.put(url, formData);
      setUpdated(true);

      if (response.status === 200) {
        setTimeout(() => {
          history(`/post/${id}`);
        }, 1500);
      }
    } catch (error) {
      setUpdateError(true);
    } finally {
      setUpdatingPost(false);
    }
  }

  if (fetchingPost) return <div>Loading...</div>;
  if (fetchError) return <div>{fetchError}</div>;

  return (
    <div className='pageContainer'>
      <form onSubmit={handleSubmit(editPost)} className='form editPostForm'>
        {updated && <div className='successMessage'>Aaand it's updated! Yeehaw!</div>}
        {updateError && (
          <div className='errorMessage'>
            Ah sorry, that did not go to plan.<br></br>Please try again.
          </div>
        )}
        <h1 className='editHeading'>Edit post</h1>
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
        <label>
          Tags
          <input {...register("tags")} defaultValue={post.tags} />
        </label>
        <button className='cta updatePostBtn'>Update</button>
        <div className='deleteBtnContainer'>
          <DeletePostButton id={post.id} />
        </div>
      </form>
    </div>
  );
}
