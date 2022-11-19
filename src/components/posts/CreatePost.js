import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const schema = yup.object().shape({
  title: yup.string().required("Please give your post a title"),
  body: yup.string(),
  media: yup.string(),
  tags: yup.string(),
});

function displayImage() {
  const imageLabel = document.querySelector("#imageLabel");
  imageLabel.classList.toggle("hidden");
}

function displayTags() {
  const tagsLabel = document.querySelector("#tagsLabel");
  tagsLabel.classList.toggle("hidden");
}

export default function RegisterForm() {
  const [created, setCreated] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [postError, setPostError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const urlAxios = useAxios();

  async function createPost(data) {
    const tagsData = data.tags;
    const splitTags = tagsData.split(" ");

    if (data.media === "") {
      data.media = null;
    }

    const formData = {
      title: data.title,
      body: data.body,
      media: data.media,
      tags: splitTags,
    };

    try {
      const response = await urlAxios.post("/social/posts", formData);
      setCreated(true);
      window.location.reload();
    } catch (error) {
      setPostError(error.toString());
    } finally {
      setCreated(false);
    }
  }

  useEffect(function () {
    async function getAvatar() {
      try {
        const response = await urlAxios.get("/social/profiles/" + auth.name);
        setAvatar(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAvatar();
  }, []);

  const [auth] = useContext(AuthContext);

  return (
    <div className='form createForm'>
      <Link to={`/myprofile`} className='userImageContainer'>
        <div className='avatar avatarSmall'>
          <img src={avatar.avatar} alt='Go to profile' />
        </div>
      </Link>

      <form onSubmit={handleSubmit(createPost)} className='createFormInputs'>
        {postError && <div>{postError}</div>}
        <label>
          <input {...register("title")} placeholder='title' />
          {errors.title && <span>{errors.title.message}</span>}
        </label>
        <label>
          <textarea {...register("body")} placeholder='body' />
        </label>
        <label id='imageLabel' className='hidden'>
          <input {...register("media")} placeholder='media' />
        </label>
        <label id='tagsLabel' className='hidden'>
          <input {...register("tags")} placeholder='tags' />
        </label>
        <div className='createBtnContainer'>
          <div className='addImageBtn' onClick={displayImage}>
            Add image
          </div>
          <div className='addTagsBtn' onClick={displayTags}>
            Add tags
          </div>
          <button className='cta createPostBtn'>Post</button>
        </div>
      </form>
    </div>
  );
}
