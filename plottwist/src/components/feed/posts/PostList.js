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
      {posts.map((post) => {
        return (
          <Link to={`/feed/${post.id}`} key={post.id}>
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>{formatDate}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
