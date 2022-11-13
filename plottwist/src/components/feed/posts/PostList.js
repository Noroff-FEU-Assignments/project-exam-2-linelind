import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import FollowButton from "../../follow/FollowButton";
import UnfollowButton from "../../follow/UnfollowButton";
import moment from "moment";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const [auth] = useContext(AuthContext);

  const postUrl = "/social/posts?_author=true&_comments=true&_reactions=true";

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await urlAxios.get(postUrl);
        setPosts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  const checkUrl = `/social/profiles/${auth.name}?_following=true`;

  useEffect(function () {
    async function getFollowing() {
      try {
        const response = await urlAxios.get(checkUrl);
        console.log(response.data.following);
        setFollowings(response.data.following);
      } catch (error) {
        setError(error);
      }
    }
    getFollowing();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  /*  let count = 5;

  function handleViewMore() {
    count = count + 5;
    console.log(count);
  } */

  const date = posts.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  return (
    <div>
      {posts.slice(0, 30).map((post) => {
        if (post.author.email !== auth.email) {
          return (
            <div key={post.id} className='postCard'>
              <Link to={`/feed/profile/${post.author.name}`} key={post.author.name}>
                <div>
                  <h2>{post.author.name}</h2>
                </div>
              </Link>
              <div>
                {followings.map((following) => {
                  if (following.name === post.author.name) {
                    return <UnfollowButton name={post.author.name} />;
                  } else {
                    return <FollowButton name={post.author.name} />;
                  }
                })}
              </div>
              <Link to={`/feed/post/${post.id}`}>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <p>{formatDate}</p>
                </div>
              </Link>
            </div>
          );
        } else {
          return (
            <div key={post.id} className='postCard'>
              <Link to={`/myprofile`}>
                <div>
                  <h2>{post.author.name}</h2>
                </div>
              </Link>
              <Link to={`/feed/post/edit/${post.id}`}>
                <button>Edit post</button>
              </Link>
              <Link to={`/feed/post/${post.id}`}>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <p>{formatDate}</p>
                </div>
              </Link>
            </div>
          );
        }
      })}
      {/* <button onClick={handleViewMore}>View more</button> */}
    </div>
  );
}
