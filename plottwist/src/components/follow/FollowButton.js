import { useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function FollowButton({ name }) {
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const followUrl = `/social/profiles/${name}/follow`;

  async function handleFollow() {
    try {
      const result = await urlAxios.put(followUrl);
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  }

  return (
    <button type='button' onClick={handleFollow}>
      {error ? "Error" : "Follow"}
    </button>
  );
}

FollowButton.propTypes = {
  name: PropTypes.string.isRequired,
};
