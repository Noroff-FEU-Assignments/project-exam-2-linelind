import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import Loader from "../layout/Loader";

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

  if (loading) return <Loader />;

  if (error) return <div className='errorMessage'>Oh no, something went wrong.</div>;

  return (
    <div className='myFollowersContainer'>
      {profilefollowers.map((follower) => {
        return (
          <Link to={`/profile/${follower.name}`} key={follower.name} onClick={() => window.reload()}>
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
