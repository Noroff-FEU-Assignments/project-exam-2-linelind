import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlPosts = useAxios();

  useEffect(
    function () {
      async function getPosts() {
        try {
          const response = await urlPosts.get("/social/posts");
          console.log("response", response);
          setPosts(response);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getPosts();
    },
    [urlPosts]
  );

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.map((post) => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </div>
  );
}
