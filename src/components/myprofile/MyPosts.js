import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import PostImage from "../common/PostImage";
import Loader from "../layout/Loader";
import ErrorMessage from "../layout/ErrorMessage";
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

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  const date = myposts.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  if (myposts.length === 0) {
    return <p>You have not posted anything yet.</p>;
  } else {
    return (
      <div className='postContainer'>
        {myposts.map((post) => {
          return (
            <div className='postCard postCardHover' key={post.id}>
              <div className='postHeader'>
                <Link to={`/myprofile`} className='postInfoContainer'>
                  <Avatar styles={"avatar avatarSmall"} media={post.author.avatar} alt={auth.name} />
                  <div>
                    <Heading size={2} title={auth.name} styling='postAuthor' />
                    <p className='date'>{formatDate}</p>
                  </div>
                </Link>
                <Link to={`/post/edit/${post.id}`}>
                  <button className='editBtn'>Edit post</button>
                </Link>
              </div>
              <Link to={`/post/${post.id}`}>
                <div>
                  <Heading size={3} title={post.title} styling='postTitle' />
                  <p>{post.body}</p>
                </div>

                <PostImage media={post.media} />

                <div className='tagsContainer'>
                  {post.tags.map((tag) => {
                    return (
                      <p className='tagItem' key={post.id + tag}>
                        {tag}
                      </p>
                    );
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
}
