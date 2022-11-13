import { useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function UnfollowButton({ name }) {
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const unfollowUrl = `/social/profiles/${name}/unfollow`;

  async function handleUnfollow() {
    try {
      const result = await urlAxios.put(unfollowUrl);
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  }

  return (
    <button type='button' onClick={handleUnfollow}>
      {error ? "Error" : "Unfollow"}
    </button>
  );
}

UnfollowButton.propTypes = {
  name: PropTypes.string.isRequired,
};
