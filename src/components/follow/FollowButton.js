import { useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function FollowButton({ name }) {
  const [error, setError] = useState(null);

  const http = useAxios();

  async function handleFollow() {
    try {
      const response = await http.put(`/social/profiles/${name}/follow`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  }

  return (
    <button onClick={handleFollow} className='followBtn'>
      {error ? "Error" : "Follow"}
    </button>
  );
}

FollowButton.propTypes = {
  name: PropTypes.string.isRequired,
};
