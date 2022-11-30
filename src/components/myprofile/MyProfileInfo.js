import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import Banner from "../common/Banner";
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
      <Banner media={myprofile.banner} alt={myprofile.name} />

      <div className='profileInfoContainer'>
        <div className='userBasicsContainer'>
          <Avatar styles={"avatar"} media={myprofile.avatar} alt={myprofile.name} />
          <div className='profileNameContainer'>
            <Heading title={myprofile.name} />
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
