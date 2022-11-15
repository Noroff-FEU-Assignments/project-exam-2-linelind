import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../hooks/useAxios";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";

const schema = yup.object().shape({
  title: yup.string().required("Please give your post a title"),
  body: yup.string(),
  media: yup.string(),
});

function displayImage() {
  const imageLabel = document.querySelector("#imageLabel");
  imageLabel.classList.toggle("isHidden");
}

function displayTags() {
  const tagsLabel = document.querySelector("#tagsLabel");
  tagsLabel.classList.toggle("isHidden");
}

export default function RegisterForm() {
  const [created, setCreated] = useState(false);
  const [postError, setPostError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const urlCreatePost = useAxios();

  async function createPost(data) {
    const CreateTitle = data.title;
    const CreateMessage = data.body;
    const CreateMedia = data.media;
    const CreateTags = [];
    CreateTags.push(data.tags);

    if (data.media === "") {
      data.media = null;
    }

    const formData = {
      title: CreateTitle,
      body: CreateMessage,
      media: CreateMedia,
      tags: CreateTags,
    };

    try {
      const response = await urlCreatePost.post("/social/posts", formData);
      setCreated(true);
      window.location.reload();
    } catch (error) {
      setPostError(error.toString());
    } finally {
      setCreated(false);
    }
  }

  const [auth] = useContext(AuthContext);

  return (
    <div className='form createForm'>
      <Link to={`/myprofile`} className='userImageContainer'>
        <div>
          <img src={auth.avatar} alt='Go to profile' className='avatarImage' />
        </div>
      </Link>

      <form>
        {postError && <div>{postError}</div>}
        <label>
          <input {...register("title")} placeholder='title' />
          {errors.title && <span>{errors.title.message}</span>}
        </label>
        <label>
          <textarea {...register("body")} placeholder='body' />
        </label>
        <label className='isHidden' id='imageLabel'>
          <input {...register("media")} placeholder='media' />
        </label>
        <label className='isHidden' id='tagsLabel'>
          <input {...register("tags")} placeholder='tags' />
        </label>
        <div class='createBtnContainer'>
          <div className='addImageBtn' onClick={displayImage}>
            Add image
          </div>
          <div className='addTagsBtn' onClick={displayTags}>
            Add tags
          </div>
          <button className='createPostBtn' onSubmit={handleSubmit(createPost)}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
