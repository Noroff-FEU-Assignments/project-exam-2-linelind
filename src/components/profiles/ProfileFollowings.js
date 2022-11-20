import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import FallbackAvatar from "../../images/fallbackavatar.jpg";

export default function ProfileFollowing() {
  const [profileFollowing, setProfileFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();

  const { name } = useParams();

  useEffect(function () {
    async function getFollowing() {
      try {
        const response = await urlAxios.get("/social/profiles/" + name + "?_following=true");
        setProfileFollowing(response.data.following);
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
      {profileFollowing.slice(0, 5).map((following) => {
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
