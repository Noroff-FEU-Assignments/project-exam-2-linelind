import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import Loader from "../layout/Loader";

export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [auth] = useContext(AuthContext);

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

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = profiles.filter((profile) => {
        return profile.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(profiles);
    }
  };

  return (
    <>
      <div className='searchContainer'>
        <input className='search' placeholder='Search profile' onChange={(event: any) => searchItems(event.target.value.trim())} />
      </div>
      <div className='profileListContainer'>
        {searchInput.length > 1
          ? filteredResults.map((profile) => {
              return (
                <Link to={`/profile/${profile.name}`} key={profile.name}>
                  <div className='profileCard'>
                    <div className='avatar avatarSmall'>
                      <img src={profile.avatar ? profile.avatar : FallbackAvatar} alt='Profile avatar.' />
                    </div>
                    <div>
                      <h2>{profile.name}</h2>
                    </div>
                  </div>
                </Link>
              );
            })
          : profiles.map((profile) => {
              return (
                <Link to={`/profile/${profile.name}`} key={profile.name}>
                  <div className='profileCard'>
                    <div className='avatar avatarSmall'>
                      <img src={profile.avatar ? profile.avatar : FallbackAvatar} alt='Profile avatar.' />
                    </div>
                    <div>
                      <h2>{profile.name}</h2>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </>
  );
}
