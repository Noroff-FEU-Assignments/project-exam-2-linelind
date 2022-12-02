import React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ProfilePosts from "./ProfilePosts";
import ProfileFollowers from "./ProfileFollowers";
import ProfileFollowing from "./ProfileFollowings";
import FollowButton from "../follow/FollowButton";

import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";

function ProfileMenu() {
  const [counted, setCounted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*   const { name } = useParams();*/

  let location = useLocation();

  const urlAxios = useAxios();

  useEffect(
    function () {
      async function getCount() {
        const name = location.pathname.split("/").pop();

        try {
          const result = await urlAxios.get(`/social/profiles/${name}?_following=true&_followers=true`);
          setCounted(result.data._count);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
      getCount();
    },
    [location.pathname]
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <ul className='nav nav-tabs navTabsProfile' id='myTab' role='tablist'>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link active'
            id='post-tab'
            data-bs-toggle='tab'
            data-bs-target='#post-tab-pane'
            type='button'
            role='tab'
            aria-controls='post-tab-pane'
            aria-selected='true'>
            Posts ({counted.posts})
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='following-tab'
            data-bs-toggle='tab'
            data-bs-target='#following-tab-pane'
            type='button'
            role='tab'
            aria-controls='following-tab-pane'
            aria-selected='false'>
            Following ({counted.following})
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='followers-tab'
            data-bs-toggle='tab'
            data-bs-target='#followers-tab-pane'
            type='button'
            role='tab'
            aria-controls='followers-tab-pane'
            aria-selected='false'>
            Followers ({counted.followers})
          </button>
        </li>
      </ul>
      <div className='tab-content' id='myTabContent'>
        <div className='tab-pane fade show active' id='post-tab-pane' role='tabpanel' aria-labelledby='post-tab' tabIndex='0'>
          <ProfilePosts />
        </div>
        <div className='tab-pane fade' id='following-tab-pane' role='tabpanel' aria-labelledby='following-tab' tabIndex='0'>
          <ProfileFollowing />
        </div>
        <div className='tab-pane fade' id='followers-tab-pane' role='tabpanel' aria-labelledby='followers-tab' tabIndex='0'>
          <ProfileFollowers />
        </div>
      </div>
    </>
  );
}

export default ProfileMenu;
