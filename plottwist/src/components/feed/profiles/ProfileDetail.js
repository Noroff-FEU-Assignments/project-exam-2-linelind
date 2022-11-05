import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

export default function ProfileDetail() {
  const [profiledetail, setProfiledetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useNavigate();

  const { name } = useParams();

  if (!name) {
    history("/feed");
  }

  const urlAxios = useAxios();
  const urlProfile = "/social/profiles/" + name;

  useEffect(function () {
    async function getProfile() {
      try {
        const response = await urlAxios.get(urlProfile);
        setProfiledetail(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  if (loading) return <div>Loading profiles...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div key={profiledetail.name}>
      <h3>{profiledetail.name}</h3>
      <p>{profiledetail.email}</p>
    </div>
  );
}
