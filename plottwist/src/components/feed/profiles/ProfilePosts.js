import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import moment from "moment";

export default function ProfilePosts() {
  const [profileposts, setProfileposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlProfilePosts = useAxios();

  const { name } = useParams();

  useEffect(function () {
    async function getProfilePosts() {
      try {
        const response = await urlProfilePosts.get("/social/profiles/" + name + "/posts");
        setProfileposts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfilePosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>{error}</div>;

  const date = profileposts.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  return (
    <div>
      {profileposts.slice(0, 15).map((post) => {
        return (
          <div key={post.id}>
            <Link to={`/feed/post/${post.id}`}>
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
