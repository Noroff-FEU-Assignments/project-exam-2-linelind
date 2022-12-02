import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function ProfileFollowing() {
  const [profileFollowing, setProfileFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [auth] = useContext(AuthContext);

  const urlAxios = useAxios();

  let location = useLocation();

  useEffect(
    function () {
      async function getFollowing() {
        const name = location.pathname.split("/").pop();

        try {
          const response = await urlAxios.get("/social/profiles/" + name + "?_following=true");
          setProfileFollowing(response.data.following);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
      getFollowing();
    },
    [location]
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  if (profileFollowing.length === 0) {
    return <p>This user is not following anyone yet.</p>;
  } else {
    return (
      <div className='followListContainer'>
        {profileFollowing.map((following) => {
          if (following.name === auth.name) {
            return (
              <Link to={`/myprofile`} key={following.name}>
                <div className='profileCard followCard'>
                  <Avatar styles={"avatar avatarSmall"} media={following.avatar} alt={following.name} />
                  <Heading size={2} title={following.name} />
                </div>
              </Link>
            );
          } else {
            return (
              <Link to={`/profile/${following.name}`} key={following.name}>
                <div className='profileCard followCard'>
                  <Avatar styles={"avatar avatarSmall"} media={following.avatar} alt={following.name} />
                  <Heading size={2} title={following.name} />
                </div>
              </Link>
            );
          }
        })}
      </div>
    );
  }
}
