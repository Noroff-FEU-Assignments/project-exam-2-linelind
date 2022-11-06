import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";

export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlProfiles = useAxios();

  useEffect(function () {
    async function getProfiles() {
      try {
        const response = await urlProfiles.get("/social/profiles");

        if (response.data.avatar === null) {
          response.data.avatar = "";
        }

        setProfiles(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfiles();
  }, []);

  if (loading) return <div>Loading profiles ..</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <Heading size='2' title='Profiles' />

      {profiles.slice(0, 5).map((profile) => {
        return (
          <Link to={`/feed/profile/${profile.name}`} key={profile.name}>
            <div>
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
