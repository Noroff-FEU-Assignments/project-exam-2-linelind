import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../../constant/api";
import Heading from "../layout/Heading";

export default function Feed() {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*  let history = useNavigate();

  const { id } = useParams();

  if (!id) {
    history("/");
  } */

  const API = API_BASE + "/social/posts";

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(API);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setFeed(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <>
      <div className='pageContainer'>
        <Heading title='Feed' />
      </div>
      <div>
        {feed.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })}
      </div>
    </>
  );
}
