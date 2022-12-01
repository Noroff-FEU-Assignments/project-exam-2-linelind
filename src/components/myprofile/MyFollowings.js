import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function MyFollowing() {
  const [myfollowing, setMyfollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlProfiles = useAxios();
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function getFollowing() {
      try {
        const response = await urlProfiles.get("/social/profiles/" + auth.name + "?_following=true");
        setMyfollowing(response.data.following);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getFollowing();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  if (myfollowing.length === 0) {
    return <p>You are not following anyone yet.</p>;
  } else {
    return (
      <div className='followListContainer'>
        {myfollowing.map((following) => {
          return (
            <Link to={`/profile/${following.name}`} key={following.name}>
              <div className='profileCard followCard'>
                <Avatar styles={"avatar avatarSmall"} media={following.avatar} alt={following.name} />
                <Heading size={2} title={following.name} />
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
