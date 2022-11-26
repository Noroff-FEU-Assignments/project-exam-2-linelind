import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ReactButton from "./reactions/ReactButton";
import CommentButton from "./comments/CommentButton";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import Loader from "../layout/Loader";
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

  if (loading) return <Loader />;
  if (error) return <div className='errorMessage'>Oh no, something went wrong.</div>;

  const date = postdetail.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  if (postdetail.author.email === auth.email) {
    return (
      <div className='pageContainer' key={postdetail.id}>
        <div className='postCard'>
          <div className='postHeader'>
            <Link to={`/myprofile`} className='postInfoContainer'>
              <div className='avatar avatarSmall'>
                <img src={postdetail.author.avatar ? postdetail.author.avatar : FallbackAvatar} alt='Profile avatar.' />
              </div>
              <div>
                <h2 className='postAuthor'>{postdetail.author.name}</h2>
                <p className='date'>{formatDate}</p>
              </div>
            </Link>
            <Link to={`/post/edit/${postdetail.id}`}>
              <button className='editBtn editBtnDetails'>Edit post</button>
            </Link>
          </div>
          <div>
            <h3 className='postTitle'>{postdetail.title}</h3>
            <p>{postdetail.body}</p>
          </div>
          {(() => {
            if (postdetail.media !== null) {
              return <img src={postdetail.media} className='postCardImage' />;
            } else {
              return null;
            }
          })()}
          <div className='tagsContainer'>
            {postdetail.tags.map((tag) => {
              if (tag !== "") {
                return <p className='tagItem'>{tag}</p>;
              }
            })}
          </div>
          <div className='commentReactionContainer'>
            <div className='reactionSymbols'>
              <ReactButton />
              <p>{postdetail._count.reactions}</p>
            </div>
            <div>
              <CommentButton />
            </div>
          </div>
          <div className='commentsContainer'>
            {postdetail.comments.map((comment) => {
              const formatCreated = moment(comment.created).startOf("hour").fromNow();
              return (
                <div className='comment'>
                  <p>{comment.body}</p>
                  <Link to={`/profile/${comment.owner}`}>
                    <div>
                      <p className='commentOwner'>Written by {comment.owner}</p>
                      <p className='date'>{formatCreated}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='pageContainer' key={postdetail.id}>
        <div className='postCard'>
          <div className='postHeader'>
            <Link to={`/profile/${postdetail.author.name}`} key={postdetail.author.name} className='postInfoContainer'>
              <div className='avatar avatarSmall'>
                <img src={postdetail.author.avatar ? postdetail.author.avatar : FallbackAvatar} alt='Profile avatar.' />
              </div>
              <div>
                <h2 className='postAuthor'>{postdetail.author.name}</h2>
                <p className='date'>{formatDate}</p>
              </div>
            </Link>
          </div>
          <div>
            <h3 className='postTitle'>{postdetail.title}</h3>
            <p>{postdetail.body}</p>
          </div>
          {(() => {
            if (postdetail.media !== null) {
              return <img src={postdetail.media} className='postCardImage' />;
            } else {
              return null;
            }
          })()}
          <div className='tagsContainer'>
            {postdetail.tags.map((tag) => {
              if (tag !== "") {
                return <p className='tagItem'>{tag}</p>;
              }
            })}
          </div>
          <div className='commentReactionContainer'>
            <div className='reactionSymbols'>
              <ReactButton />
              <p>{postdetail._count.reactions}</p>
            </div>
            <div>
              <CommentButton />
            </div>
          </div>
          <div className='commentsContainer'>
            {postdetail.comments.map((comment) => {
              const formatCreated = moment(comment.created).startOf("hour").fromNow();
              return (
                <div className='comment'>
                  <p>{comment.body}</p>
                  <Link to={`/profile/${comment.owner}`}>
                    <div>
                      <p className='commentOwner'>Written by {comment.owner}</p>
                      <p className='date'>{formatCreated}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
