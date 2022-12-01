import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import FollowUnfollow from "../follow/FollowUnfollow";
import Avatar from "../common/Avatar";
import Banner from "../common/Banner";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function ProfileDetail() {
  const [profiledetail, setProfiledetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followings, setFollowings] = useState([]);
  const [error, setError] = useState(null);

  // let history = useNavigate();

  let location = useLocation();

  // const { name } = useParams();

  // if (!name) {
  //   history("/feed");
  // }

  const urlAxios = useAxios();

  useEffect(
    function () {
      const name = location.pathname.split("/").pop();
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
    },
    [location.pathname]
  );

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
          <FollowUnfollow followings={followings} authorName={profiledetail.name} />
        </div>
      </div>
    </div>
  );
}
