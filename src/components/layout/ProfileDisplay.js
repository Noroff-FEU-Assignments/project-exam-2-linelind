import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import Banner from "../common/Banner";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function ProfileDisplay() {
  const [userInfo, setUserInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function getUserInfo() {
      try {
        const response = await urlAxios.get("/social/profiles/" + auth.name);
        setUserInfo(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getUserInfo();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      <Link to='/myprofile'>
        {/*         <Banner styles='banner' media={userInfo.banner} alt={userInfo.name} />
         */}{" "}
        <Avatar styles={"avatar"} media={userInfo.avatar} alt={userInfo.name} />
        <div className='profileNameContainer'>
          <Heading title={userInfo.name} />
          <p>{userInfo.email}</p>
        </div>
      </Link>
    </div>
  );
}
