import React from "react";
import PostList from "../posts/PostList";
import ProfileList from "../profiles/ProfileList";

function FeedMenu() {
  return (
    <>
      <ul className='nav nav-tabs navTabsFeed' id='myTab' role='tablist'>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link active'
            id='posts-tab'
            data-bs-toggle='tab'
            data-bs-target='#posts-tab-pane'
            type='button'
            role='tab'
            aria-controls='posts-tab-pane'
            aria-selected='true'>
            View posts
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='profiles-tab'
            data-bs-toggle='tab'
            data-bs-target='#profiles-tab-pane'
            type='button'
            role='tab'
            aria-controls='profiles-tab-pane'
            aria-selected='false'>
            View profiles
          </button>
        </li>
      </ul>
      <div className='tab-content' id='myTabContent'>
        <div className='tab-pane fade show active' id='posts-tab-pane' role='tabpanel' aria-labelledby='posts-tab' tabIndex='0'>
          <PostList />
        </div>
        <div className='tab-pane fade' id='profiles-tab-pane' role='tabpanel' aria-labelledby='profiles-tab' tabIndex='0'>
          <ProfileList />
        </div>
      </div>
    </>
  );
}

export default FeedMenu;
