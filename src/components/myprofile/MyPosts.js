import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import moment from "moment";

export default function MyPosts() {
  const [myposts, setMyposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlMyPosts = useAxios();
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function getMyPosts() {
      try {
        const response = await urlMyPosts.get("/social/profiles/" + auth.name + "/posts?_author=true");
        setMyposts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getMyPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>{error}</div>;

  const date = myposts.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  return (
    <div className='postContainer'>
      {myposts.slice(0, 15).map((post) => {
        return (
          <div key={post.id} className='postCard'>
            <div className='postHeader'>
              <Link to={`/myprofile`} className='postInfoContainer'>
                <div className='avatar avatarSmall'>
                  <img src={post.author.avatar ? post.author.avatar : FallbackAvatar} alt='Profile avatar.' />
                </div>
                <div>
                  <h2>{auth.name}</h2>
                  <p className='date'>{formatDate}</p>
                </div>
              </Link>
              <Link to={`/feed/post/edit/${post.id}`}>
                <button className='editBtn'>Edit post</button>
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
                  return <p className='tagItem'>{tag}</p>;
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