import React from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileFollowers from "./ProfileFollowers";
import ProfileFollowing from "./ProfileFollowings";

function ProfileMenu() {
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
            Following
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
            Followers
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
