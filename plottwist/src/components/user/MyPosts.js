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
        const response = await urlMyPosts.get("/social/profiles/" + auth.name + "/posts");
        console.log(response.data);
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
      {myposts.slice(0, 15).map((mypost) => {
        return (
          <div key={mypost.id} className='postCard'>
            <Link to={`/myprofile`}>
              <div>
                <h2>{auth.name}</h2>
              </div>
            </Link>
            <Link to={`/feed/post/edit/${mypost.id}`}>
              <button>Edit post</button>
            </Link>
            <Link to={`/feed/post/${mypost.id}`}>
              <div>
                <h3>{mypost.title}</h3>
                <p>{mypost.body}</p>
                <p>{formatDate}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
