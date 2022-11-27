import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FollowUnfollow from "../follow/FollowUnfollow";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import FallbackBanner from "../../images/fallbackbanner.jpg";
import Loader from "../layout/Loader";
import ErrorMessage from "../layout/ErrorMessage";

export default function ProfileDetail() {
  const [profiledetail, setProfiledetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followings, setFollowings] = useState([]);
  const [error, setError] = useState(null);

  let history = useNavigate();

  const { name } = useParams();

  if (!name) {
    history("/feed");
  }

  const urlAxios = useAxios();

  useEffect(function () {
    async function getProfileDetail() {
      try {
        const result = await urlAxios.get("/social/profiles/" + name);
        setProfiledetail(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getProfileDetail();
  }, []);

  const [auth] = useContext(AuthContext);

  const checkUrl = `/social/profiles/${auth.name}?_following=true`;

  useEffect(function () {
    async function getFollowing() {
      try {
        const response = await urlAxios.get(checkUrl);
        setFollowings(response.data.following);
      } catch (error) {
        setError(true);
      }
    }
    getFollowing();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className='profileHeaderContainer' key={profiledetail.name}>
      <div className='banner'>
        <img src={profiledetail.banner ? profiledetail.banner : FallbackBanner} alt='Profile avatar.' />
      </div>
      <div className='profileInfoContainer'>
        <div className='userBasicsContainer'>
          <div className='avatar'>
            <img src={profiledetail.avatar ? profiledetail.avatar : FallbackAvatar} alt='Profile avatar.' />
          </div>
          <div className='profileNameContainer'>
            <h1>{profiledetail.name}</h1>
            <p>{profiledetail.email}</p>
          </div>
        </div>
        <div>
          <FollowUnfollow followings={followings} authorName={profiledetail.name} />
        </div>
      </div>
    </div>
  );
}
