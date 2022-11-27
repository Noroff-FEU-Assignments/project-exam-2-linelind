import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function UnfollowButton() {
  const [error, setError] = useState(false);

  const { name } = useParams();

  const urlAxios = useAxios();

  async function handleUnfollow() {
    try {
      const response = await urlAxios.put("/social/profiles/" + name + "/unfollow");
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  }

  return (
    <button type='button' onClick={handleUnfollow} className='unfollowBtn'>
      {error ? "Error" : "Unfollow"}
    </button>
  );
}

UnfollowButton.propTypes = {
  name: PropTypes.string.isRequired,
};
