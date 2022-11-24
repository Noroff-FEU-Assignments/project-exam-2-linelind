import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import Loader from "../layout/Loader";

export default function MyFollowers() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [auth] = useContext(AuthContext);

  const { name } = useParams();
  const urlAxios = useAxios();

  useEffect(function () {
    async function getFollowers() {
      try {
        const response = await urlAxios.get("/social/profiles/" + name + "?_followers=true");
        setFollowers(response.data.followers);
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
      {followers.map((follower) => {
        if (follower.name !== auth.name) {
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
        } else {
          <Link to={`/myprofile`} key={follower.name}>
            <div className='myProfileFollow'>
              <div className='avatar avatarSmall'>
                <img src={follower.avatar ? follower.avatar : FallbackAvatar} alt='Profile avatar.' />
              </div>
              <h2>{follower.name}</h2>
            </div>
          </Link>;
        }
      })}
    </div>
  );
}
