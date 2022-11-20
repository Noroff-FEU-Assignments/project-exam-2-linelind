import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import FallbackAvatar from "../../images/fallbackavatar.jpg";

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

  if (loading) return <div>Loading profiles ..</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className='myFollowersContainer'>
      {myfollowing.slice(0, 5).map((following) => {
        return (
          <Link to={`/profile/${following.name}`} key={following.name}>
            <div className='myProfileFollow'>
              <div className='avatar avatarSmall'>
                <img src={following.avatar ? following.avatar : FallbackAvatar} alt='Profile avatar.' />
              </div>
              <h2>{following.name}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
