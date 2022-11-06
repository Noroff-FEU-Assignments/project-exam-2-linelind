import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";

const schema = yup.object().shape({
  banner: yup.string().matches(/(http[s]?:\/\/.*\.)/i, "Please enter a valid image url"),
  avatar: yup.string().matches(/(http[s]?:\/\/.*\.)/i, "Please enter a valid image url"),
});

export default function EditMyProfile() {
  const [profilemedia, setProfilemedia] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingMedia, setFetchingMedia] = useState(true);
  const [updatingMedia, setUpdatingMedia] = useState(false);
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

  const axiosUrl = useAxios();

  let { name } = useParams();

  const MyInfourl = "/social/profiles/" + name;

  useEffect(function () {
    async function getMedia() {
      try {
        const response = await axiosUrl.get(MyInfourl);

        if (response.data.banner === null) {
          response.data.banner = "";
        }

        if (response.data.avatar === null) {
          response.data.avatar = "";
        }

        setProfilemedia(response.data);
      } catch (error) {
        setFetchError(error.toString());
      } finally {
        setFetchingMedia(false);
      }
    }

    getMedia();
  }, []);

  const MyMediaUrl = "/social/profiles/" + name + "/media";

  async function onSubmit(data) {
    setUpdatingMedia(true);
    setUpdateError(null);
    setUpdated(false);

    if (data.banner === "") {
      data.banner = null;
    }

    if (data.avatar === "") {
      data.avatar = null;
    }

    try {
      const response = await axiosUrl.put(MyMediaUrl, data);

      setUpdated(true);
    } catch (error) {
      setUpdateError(error.toString());
    } finally {
      setUpdatingMedia(false);
    }
  }

  if (fetchingMedia) return <div>Loading...</div>;

  if (fetchError) return <div>{fetchError}</div>;

  return (
    <div className='pageContainer'>
      <Heading title='Edit media' />

      <form onSubmit={handleSubmit(onSubmit)}>
        {updated && <div>Your profile was updated</div>}
        <label>
          Banner
          <input {...register("banner")} defaultValue={profilemedia.banner} />
          {errors.banner && <span>{errors.banner.message}</span>}
        </label>
        <label>
          Avatar
          <input {...register("avatar")} defaultValue={profilemedia.avatar} />
          {errors.avatar && <span>{errors.avatar.message}</span>}
        </label>
        <button>Update profile</button>
      </form>
    </div>
  );
}
