import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import FallbackAvatar from "../../images/fallbackavatar.jpg";

export default function ProfileFollowers() {
  const [profilefollowers, setProfilefollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();

  const { name } = useParams();

  useEffect(function () {
    async function getFollowers() {
      try {
        const response = await urlAxios.get("/social/profiles/" + name + "?_followers=true");
        setProfilefollowers(response.data.followers);
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
      {profilefollowers.slice(0, 5).map((follower) => {
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
