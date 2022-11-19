import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import FollowButton from "../../common/FollowButton";
import UnfollowButton from "../../common/UnfollowButton";
import moment from "moment";

export default function ProfilePosts() {
  const [profileposts, setProfileposts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();

  const { name } = useParams();

  useEffect(function () {
    async function getProfilePosts() {
      try {
        const response = await urlAxios.get("/social/profiles/" + name + "/posts");
        setProfileposts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfilePosts();
  }, []);

  const checkUrl = `/social/profiles/${name}?_followers=true`;

  useEffect(function () {
    async function getFollowing() {
      try {
        const result = await urlAxios.get(checkUrl);
        setFollowers(result.data.followers);
      } catch (error) {
        setError(error);
      }
    }
    getFollowing();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  const date = profileposts.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  return (
    <div>
      {profileposts.slice(0, 15).map((post) => {
        return (
          <div key={post.id} className='postCard'>
            <div className='postHeader'>
              <div>
                {followers.map((follower) => {
                  if (follower.name === post.name) {
                    return <UnfollowButton name={post.name} />;
                  } else {
                    return <FollowButton name={post.name} />;
                  }
                })}
              </div>
              <Link to={`/feed/profile/${name}`} key={name}>
                <div>
                  <h2>{name}</h2>
                  <p>{formatDate}</p>
                </div>
              </Link>
            </div>
            <Link to={`/feed/post/${post.id}`}>
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
              {(() => {
                if (post.image !== null) {
                  return <img src={post.media} className='postCardImage' />;
                } else {
                  return null;
                }
              })()}
              <div className='tagsContainer'>
                {post.tags.map((tag) => {
                  if (tag !== "") {
                    return <p className='tagItem'>{tag}</p>;
                  }
                })}
              </div>
              <div className='iconContainer'>
                {(() => {
                  if (post._count.comments !== 0) {
                    return <i className='fa-regular fa-comment-dots '></i>;
                  }
                  return null;
                })()}
                {(() => {
                  if (post._count.reactions !== 0) {
                    return <i className='fa-regular fa-heart '></i>;
                  }
                  return null;
                })()}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
