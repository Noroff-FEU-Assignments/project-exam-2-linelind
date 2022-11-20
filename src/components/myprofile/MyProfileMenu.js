import React from "react";
import MyPosts from "./MyPosts";
import MyFollowing from "./MyFollowings";
import MyFollowers from "./MyFollowers";

function MyPorfileMenu() {
  return (
    <>
      <ul className='nav nav-tabs' id='myTab' role='tablist'>
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
            Posts
          </button>
        </li>
        <li class='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='following-tab'
            data-bs-toggle='tab'
            data-bs-target='#following-tab-pane'
            type='button'
            role='tab'
            aria-controls='following-tab-pane'
            aria-selected='false'>
            Following
          </button>
        </li>
        <li class='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='followers-tab'
            data-bs-toggle='tab'
            data-bs-target='#followers-tab-pane'
            type='button'
            role='tab'
            aria-controls='followers-tab-pane'
            aria-selected='false'>
            Followers
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

export default MyPorfileMenu;
