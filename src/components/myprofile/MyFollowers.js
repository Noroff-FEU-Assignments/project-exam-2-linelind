import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function MyFollowers() {
  const [myfollowers, setMyfollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function getFollowers() {
      try {
        const response = await urlAxios.get("/social/profiles/" + auth.name + "?_followers=true");
        setMyfollowers(response.data.followers);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getFollowers();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  if (myfollowers.length === 0) {
    return <p>No followers to show.</p>;
  } else {
    return (
      <div className='followListContainer'>
        {myfollowers.map((follower) => {
          return (
            <Link to={`/profile/${follower.name}`} key={follower.name}>
              <div className='profileCard followCard'>
                <Avatar styles={"avatar avatarSmall"} media={follower.avatar} alt={follower.name} />
                <Heading size={2} title={follower.name} />
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
