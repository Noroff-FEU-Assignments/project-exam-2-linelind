import React from "react";
import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import MyPosts from "./MyPosts";
import MyFollowing from "./MyFollowings";
import MyFollowers from "./MyFollowers";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";

function MyProfileMenu() {
  const [counted, setCounted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function getCount() {
      try {
        const result = await urlAxios.get("/social/profiles/" + auth.name);
        setCounted(result.data._count);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getCount();
  }, []);

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
          <MyPosts />
        </div>
        <div className='tab-pane fade' id='following-tab-pane' role='tabpanel' aria-labelledby='following-tab' tabIndex='0'>
          <MyFollowing />
        </div>
        <div className='tab-pane fade' id='followers-tab-pane' role='tabpanel' aria-labelledby='followers-tab' tabIndex='0'>
          <MyFollowers />
        </div>
      </div>
    </>
  );
}

export default MyProfileMenu;
