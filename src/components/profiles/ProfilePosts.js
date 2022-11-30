import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import PostImage from "../common/PostImage";
import Avatar from "../common/Avatar";
import Loader from "../layout/Loader";
import ErrorMessage from "../layout/ErrorMessage";
import moment from "moment";

export default function ProfilePosts() {
  const [profileposts, setProfileposts] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();

  const { name } = useParams();

  useEffect(function () {
    async function getProfilePosts() {
      try {
        const response = await urlAxios.get("/social/profiles/" + name + "/posts?_author=true");
        setProfileposts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfilePosts();
  }, []);

  const [auth] = useContext(AuthContext);
  const checkUrl = `/social/profiles/${auth.name}?_following=true`;

  useEffect(function () {
    async function getFollowing() {
      try {
        const result = await urlAxios.get(checkUrl);
        setFollowings(result.data.following);
      } catch (error) {
        setError(true);
      }
    }
    getFollowing();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  const date = profileposts.created;
  const formatDate = moment(date).startOf("hour").fromNow();

  if (profileposts.length === 0) {
    return <p>This user has not posted anything yet.</p>;
  } else {
    return (
      <div className='postContainer'>
        {profileposts.map((post) => {
          return (
            <div className='postCard postCardHover' key={post.id}>
              <div className='postHeader'>
                <Link to={`/profile/${name}`} key={name} className='postInfoContainer'>
                  <Avatar styles={"avatar avatarSmall"} media={post.author.avatar} alt={name} />
                  <div>
                    <Heading size={2} title={name} styling='postAuthor' />
                    <p className='date'>{formatDate}</p>
                  </div>
                </Link>
              </div>
              <Link to={`/post/${post.id}`}>
                <div>
                  <Heading size={3} title={post.title} styling='postTitle' />
                  <p>{post.body}</p>
                </div>
                <PostImage media={post.media} />
                <div className='tagsContainer'>
                  {post.tags.map((tag) => {
                    if (tag !== "") {
                      return (
                        <p className='tagItem' key={post.id + tag}>
                          {tag}
                        </p>
                      );
                    }
                  })}
                </div>
                <div className='iconContainer'>
                  {(() => {
                    if (post._count.comments !== 0) {
                      return <i className='fa-solid fa-comment'></i>;
                    }
                    return null;
                  })()}
                  {(() => {
                    if (post._count.reactions !== 0) {
                      return <i className='fa-solid fa-heart'></i>;
                    }
                    return null;
                  })()}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
