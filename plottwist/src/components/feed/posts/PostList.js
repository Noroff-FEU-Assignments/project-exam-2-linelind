import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import moment from "moment";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlPosts = useAxios();

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await urlPosts.get("/social/posts");
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>{error}</div>;

  const date = posts.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  return (
    <div>
      {posts.slice(0, 15).map((post) => {
        return (
          <div key={post.id}>
            <Link to={`/feed/edit/${post.id}`}>
              <button>Edit post</button>
            </Link>
            <Link to={`/feed/${post.id}`}>
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p>{formatDate}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
