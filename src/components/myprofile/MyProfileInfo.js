import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import FallbackBanner from "../../images/fallbackbanner.jpg";
import Loader from "../layout/Loader";
import ErrorMessage from "../layout/ErrorMessage";

export default function ProfileInfo() {
  const [myprofile, setMyprofile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function getProfile() {
      try {
        const response = await urlAxios.get("/social/profiles/" + auth.name);
        setMyprofile(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className='profileHeaderContainer'>
      <div className='banner'>
        <img src={myprofile.banner ? myprofile.banner : FallbackBanner} alt='Profile banner.' />
      </div>
      <div className='profileInfoContainer'>
        <div className='userBasicsContainer'>
          <div className='avatar'>
            <img src={myprofile.avatar ? myprofile.avatar : FallbackAvatar} alt='Profile avatar.' />
          </div>
          <div className='profileNameContainer'>
            <h1>{myprofile.name}</h1>
            <p>{myprofile.email}</p>
          </div>
        </div>
        <Link to={`/myprofile/edit/${myprofile.name}`}>
          <button className='editBtn'>Edit profile</button>
        </Link>
      </div>
    </div>
  );
}
