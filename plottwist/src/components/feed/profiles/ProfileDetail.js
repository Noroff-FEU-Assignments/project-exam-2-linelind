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

  const urlProfileDetail = useAxios();

  useEffect(function () {
    async function getProfileDetail() {
      try {
        const result = await urlProfileDetail.get(`/social/profiles/${name}`);
        setProfiledetail(result);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfileDetail();
  }, []);

  if (loading) return <div>Loading profile info...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div key={profiledetail.name}>
      <h3>{profiledetail.name}</h3>
      <p>{profiledetail.email}</p>
    </div>
  );
}
