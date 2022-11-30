import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import Loader from "../layout/Loader";
import ErrorMessage from "../layout/ErrorMessage";

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
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getFollowers();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  if (followers.length === 0) {
    return <p>No followers to show.</p>;
  } else {
    return (
      <div className='followListContainer'>
        {followers.map((follower) => {
          if (follower.name === auth.name) {
            return (
              <Link to={`/myprofile`} key={follower.name}>
                <div className='profileCard followCard'>
                  <Avatar styles={"avatar avatarSmall"} media={follower.avatar} alt={follower.name} />
                  <Heading size={2} title={follower.name} />
                </div>
              </Link>
            );
          } else {
            return (
              <Link to={`/profile/${follower.name}`} key={follower.name}>
                <div className='profileCard followCard'>
                  <Avatar styles={"avatar avatarSmall"} media={follower.avatar} alt={follower.name} />
                  <Heading size={2} title={follower.name} />
                </div>
              </Link>
            );
          }
        })}
      </div>
    );
  }
}
