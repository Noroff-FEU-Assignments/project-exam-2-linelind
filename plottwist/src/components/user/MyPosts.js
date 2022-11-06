import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
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
        const response = await urlMyPosts.get("/social/posts?_author=true");
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
    <div>
      {myposts.slice(0, 15).map((post) => {
        if (post.author.email === auth.email) {
          return (
            <div key={post.id}>
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
    </div>
  );
}
