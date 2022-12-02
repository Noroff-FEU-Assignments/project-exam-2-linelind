import { useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function UnfollowButton(props) {
  const [error, setError] = useState(false);

  const urlAxios = useAxios();

  async function handleUnfollow() {
    try {
      const response = await urlAxios.put(`/social/profiles/${props.name}/unfollow`);
      console.log(response);

      window.location.reload();
    } catch (error) {
      setError(error);
    }
  }

  return (
    <button onClick={handleUnfollow} className='unfollowBtn'>
      Unfollow
    </button>
  );
}

UnfollowButton.propTypes = {
  name: PropTypes.string.isRequired,
};
