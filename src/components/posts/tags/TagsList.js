import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Loader from "../../layout/Loader";
import ErrorMessage from "../../layout/ErrorMessage";

export default function TagsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();

  useEffect(function () {
    async function getTags() {
      try {
        const response = await urlAxios.get(`/social/posts`);
        setPosts(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getTags();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <ul>
      {posts.map((post) => {
        return (
          <>
            {post.tags.map((tag) => {
              if (tag !== "") {
                return (
                  <li>
                    <Link to={`/post/${tag}`}>{tag}</Link>
                  </li>
                );
              }
            })}
          </>
        );
      })}
    </ul>
  );
}
