import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import Loader from "../layout/Loader";
import ErrorMessage from "../layout/ErrorMessage";
import moment from "moment";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const [auth] = useContext(AuthContext);

  const postUrl = `/social/posts?_author=true&_comments=true&_reactions=true`;

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await urlAxios.get(postUrl);
        setPosts(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

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
            <div className='postCard postCardHover' key={post.id}>
              <div className='postHeader'>
                <Link to={`/profile/${post.author.name}`} key={post.author.name} className='postInfoContainer'>
                  <div className='avatar avatarSmall'>
                    <img src={post.author.avatar ? post.author.avatar : FallbackAvatar} alt='Profile avatar.' />
                  </div>
                  <div>
                    <h2 className='postAuthor'>{post.author.name}</h2>
                    <p className='date'>{formatDate}</p>
                  </div>
                </Link>
              </div>
              <Link to={`/post/${post.id}`}>
                <div>
                  <h3 className='postTitle'>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
                {(() => {
                  if (post.media === null || post.image === "") {
                    return null;
                  } else {
                    return <img src={post.media} className='postCardImage' />;
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
            <div className='postCard postCardHover' key={post.id}>
              <div className='postHeader'>
                <Link to={`/myprofile`} className='postInfoContainer'>
                  <div className='avatar avatarSmall'>
                    <img src={post.author.avatar ? post.author.avatar : FallbackAvatar} alt='Profile avatar.' />
                  </div>
                  <div>
                    <h2 className='postAuthor'>{post.author.name}</h2>
                    <p className='date'>{formatDate}</p>
                  </div>
                </Link>
                <Link to={`/post/edit/${post.id}`}>
                  <button className='editBtn'>Edit post</button>
                </Link>
              </div>
              <Link to={`/post/${post.id}`}>
                <div>
                  <h3 className='postTitle'>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
                {(() => {
                  if (post.media === null || post.image === "") {
                    return null;
                  } else {
                    return <img src={post.media} className='postCardImage' />;
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
