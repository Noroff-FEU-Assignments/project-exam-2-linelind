import { useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function FollowButton(props) {
  const [error, setError] = useState(false);

  const urlAxios = useAxios();

  async function handleFollow() {
    try {
      const response = await urlAxios.put(`/social/profiles/${props.name}/follow`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  }

  return (
    <button onClick={handleFollow} className='cta'>
      Follow
    </button>
  );
}

FollowButton.propTypes = {
  name: PropTypes.string.isRequired,
};
