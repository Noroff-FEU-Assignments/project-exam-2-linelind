import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FollowUnfollow from "../follow/FollowUnfollow";
import moment from "moment";

export default function ProfilePosts() {
  const [profileposts, setProfileposts] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();

  const { name } = useParams();

  useEffect(function () {
    async function getProfilePosts() {
      try {
        const response = await urlAxios.get("/social/profiles/" + name + "/posts?_author=true");
        setProfileposts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfilePosts();
  }, []);

  const [auth] = useContext(AuthContext);
  const checkUrl = `/social/profiles/${auth.name}?_following=true`;

  useEffect(function () {
    async function getFollowing() {
      try {
        const result = await urlAxios.get(checkUrl);
        setFollowings(result.data.following);
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
    <div className='postContainer'>
      {profileposts.slice(0, 15).map((post) => {
        return (
          <div key={post.id} className='postCard'>
            <div className='postHeader'>
              <div>
                <FollowUnfollow followings={followings} authorName={post.author.name} />
              </div>
              <Link to={`/feed/profile/${name}`} key={name}>
                <div>
                  <h2>{name}</h2>
                  <p className='date'>{formatDate}</p>
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
                    return <i className='fa-solid fa-comment'></i>;
                  }
                  return null;
                })()}
                {(() => {
                  if (post._count.reactions !== 0) {
                    return <i className='fa-solid fa-heart'></i>;
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
