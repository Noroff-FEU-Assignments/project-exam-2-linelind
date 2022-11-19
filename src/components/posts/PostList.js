import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FollowUnfollow from "../follow/FollowUnfollow";
import moment from "moment";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const [auth] = useContext(AuthContext);

  const postUrl = `/social/posts?_author=true&_comments=true&_reactions=true&limit=30`;

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
        setFollowings(response.data.following);
      } catch (error) {
        setError(error);
      }
    }
    getFollowing();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  if (posts.media === "") {
    posts.media = null;
  }

  const date = posts.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  return (
    <div>
      {posts.map((post) => {
        if (post.author.email !== auth.email) {
          return (
            <div key={post.id} className='postCard'>
              <div className='postHeader'>
                <div>
                  <FollowUnfollow followings={followings} authorName={post.author.name} />
                </div>
                <Link to={`/feed/profile/${post.author.name}`} key={post.author.name}>
                  <div>
                    <h2>{post.author.name}</h2>
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
                  if (post.media !== null) {
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
        } else {
          return (
            <div key={post.id} className='postCard'>
              <div className='postHeader'>
                <Link to={`/feed/post/edit/${post.id}`}>
                  <button className='editBtn'>Edit post</button>
                </Link>
                <Link to={`/myprofile`}>
                  <div>
                    <h2>{post.author.name}</h2>
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
        }
      })}
    </div>
  );
}
