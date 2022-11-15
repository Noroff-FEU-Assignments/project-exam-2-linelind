import { useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function UnfollowButton({ name }) {
  const [error, setError] = useState(null);

  const http = useAxios();

  async function handleUnfollow() {
    try {
      const response = await http.put(`/social/profiles/${name}/unfollow`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  return (
    <button type='button' onClick={handleUnfollow} className='followBtn'>
      {error ? "Error" : "Unfollow"}
    </button>
  );
}

UnfollowButton.propTypes = {
  name: PropTypes.string.isRequired,
};
