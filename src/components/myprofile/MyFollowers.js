import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import FallbackAvatar from "../../images/fallbackavatar.jpg";

export default function MyFollowers() {
  const [myfollowers, setMyfollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlProfiles = useAxios();
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function getFollowers() {
      try {
        const response = await urlProfiles.get("/social/profiles/" + auth.name + "?_followers=true");
        setMyfollowers(response.data.followers);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getFollowers();
  }, []);

  if (loading) return <div>Loading profiles ..</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className='myFollowersContainer'>
      {myfollowers.slice(0, 5).map((follower) => {
        return (
          <Link to={`/profile/${follower.name}`} key={follower.name}>
            <div className='myProfileFollow'>
              <div className='avatar avatarSmall'>
                <img src={follower.avatar ? follower.avatar : FallbackAvatar} alt='Profile avatar.' />
              </div>
              <h2>{follower.name}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
