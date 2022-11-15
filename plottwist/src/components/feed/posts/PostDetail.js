import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import ReactButton from "./reactions/ReactButton";
import CommentButton from "./comments/CommentButton";
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

  const [auth] = useContext(AuthContext);

  const urlAxios = useAxios();
  const urlPostDetail = "/social/posts/" + id + "?_author=true&_comments=true&_reactions=true";

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

  if (postdetail.author.email === auth.email) {
    return (
      <div className='pageContainer'>
        <div className='postCard' key={postdetail.id}>
          <Link to={`/feed/post/edit/${postdetail.id}`}>
            <button>Edit post</button>
          </Link>
          <div>
            <h2>{postdetail.author.name}</h2>
            <h3>{postdetail.title}</h3>
            <p>{postdetail.body}</p>
          </div>
          <div className='tagsContainer'>
            {postdetail.tags.map((tag) => {
              if (tag !== "") {
                return <p className='tagItem'>{tag}</p>;
              }
            })}
          </div>
          <div>
            <div className='reactionSymbols'>
              <ReactButton />
              <p>{postdetail._count.reactions}</p>
            </div>
            <div>
              <CommentButton />
            </div>
          </div>
          <div>
            {postdetail.comments.map((comment) => {
              const formatCreated = moment(comment.created).startOf("hour").fromNow();
              return (
                <div>
                  <p>{comment.body}</p>
                  <p>{comment.owner}</p>
                  <p>{formatCreated}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='pageContainer'>
        <div className='postCard' key={postdetail.id}>
          <div>
            <h2>{postdetail.author.name}</h2>
            <h3>{postdetail.title}</h3>
            <p>{postdetail.body}</p>
          </div>
          <div className='tagsContainer'>
            {postdetail.tags.map((tag) => {
              if (tag !== "") {
                return <p className='tagItem'>{tag}</p>;
              }
            })}
          </div>
          <div>
            <div className='reactionSymbols'>
              <ReactButton />
              <p>{postdetail._count.reactions}</p>
            </div>
            <div>
              <CommentButton />
            </div>
          </div>
          <div>
            {postdetail.comments.map((comment) => {
              const formatCreated = moment(comment.created).startOf("hour").fromNow();
              return (
                <div>
                  <p>{comment.body}</p>
                  <p>{comment.owner}</p>
                  <p>{formatCreated}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
