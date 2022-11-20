import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import Loader from "../layout/Loader";

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

  if (loading) return <Loader />;

  if (error) return <div className='errorMessage'>Oh no, something went wrong.</div>;

  return (
    <div className='myFollowersContainer'>
      {profileFollowing.map((following) => {
        return (
          <Link to={`/profile/${following.name}`} key={following.name} onClick={() => window.reload()}>
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
