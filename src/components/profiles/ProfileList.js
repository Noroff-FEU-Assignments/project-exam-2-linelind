import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import Loader from "../layout/Loader";

export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlProfiles = useAxios();

  useEffect(function () {
    async function getProfiles() {
      try {
        const response = await urlProfiles.get("/social/profiles");
        setProfiles(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfiles();
  }, []);

  if (loading) return <Loader />;

  if (error) return <div className='errorMessage'>Oh no, something went wrong.</div>;

  return (
    <div>
      <Heading size='2' title='Profiles' />

      {profiles.map((profile) => {
        return (
          <Link to={`/profile/${profile.name}`} key={profile.name}>
            <div className='profileCard'>
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
