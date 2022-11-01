import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import moment from "moment";

export default function PostDetail() {
  const [postdetail, setPostdetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useNavigate();

  const { id } = useParams();

  if (!id) {
    history("/feed");
  }

  const urlAxios = useAxios();
  const urlPostDetail = "/social/posts/" + id;

  useEffect(function () {
    async function getPostDetail() {
      try {
        const result = await urlAxios.get(urlPostDetail);
        setPostdetail(result.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPostDetail();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>{error}</div>;

  const date = postdetail.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  return (
    <div key={postdetail.id}>
      <h3>{postdetail.title}</h3>
      <p>{postdetail.body}</p>
    </div>
  );
}
