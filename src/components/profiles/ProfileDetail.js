import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
/* import FollowUnfollow from "../follow/FollowUnfollow"; */
import FollowButton from "../follow/FollowButton";
import UnfollowButton from "../follow/UnfollowButton";
import Avatar from "../common/Avatar";
import Banner from "../common/Banner";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function ProfileDetail() {
  const [profiledetail, setProfiledetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [error, setError] = useState(null);

  const [auth] = useContext(AuthContext);

  let location = useLocation();
  const name = location.pathname.split("/").pop();
  const urlAxios = useAxios();

  useEffect(
    function () {
      async function getProfileDetail() {
        try {
          const result = await urlAxios.get(`/social/profiles/${name}?_following=true&_followers=true`);
          setProfiledetail(result.data);
          setFollowers(result.data.followers);
          setFollowings(result.data.following);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
      getProfileDetail();
    },
    [location.pathname]
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  let isFollowing = false;
  followers.map((follower) => {
    if (follower.name === auth.name) {
      isFollowing = true;
    }
  });

  let followUnfollowButton;

  if (isFollowing === true) {
    followUnfollowButton = <UnfollowButton name={name} />;
  } else {
    followUnfollowButton = <FollowButton name={name} />;
  }

  return (
    <div className='profileHeaderContainer' key={profiledetail.name}>
      <Banner styles='banner' media={profiledetail.banner} alt={profiledetail.name} />
      <div className='profileInfoContainer'>
        <div className='userBasicsContainer'>
          <Avatar styles={"avatar"} media={profiledetail.avatar} alt={profiledetail.name} />
          <div className='profileNameContainer'>
            <Heading title={profiledetail.name} />
            <p>{profiledetail.email}</p>
          </div>
        </div>
        <div>
          <div>{followUnfollowButton}</div>
        </div>
      </div>
    </div>
  );
}
