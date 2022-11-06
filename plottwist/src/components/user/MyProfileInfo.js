import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

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

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className='pageContainer'>
      <div>
        <img src={myprofile.banner} alt='Banner image' />
      </div>
      <div>
        <div>
          <img src={myprofile.avatar} alt='Profile avatar' />
        </div>
        <div>
          <h1>{myprofile.name}</h1>
          <p>{myprofile.email}</p>
        </div>
        <Link to={`/myprofile/edit/${myprofile.name}`}>
          <button>Edit profile</button>
        </Link>
      </div>
    </div>
  );
}
