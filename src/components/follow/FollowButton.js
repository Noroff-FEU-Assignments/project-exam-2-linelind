import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function FollowButton() {
  const [error, setError] = useState(false);

  const { name } = useParams();

  const urlAxios = useAxios();

  async function handleFollow() {
    try {
      const response = await urlAxios.put("/social/profiles/" + name + "/follow");
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  }

  return (
    <button onClick={handleFollow} className='cta'>
      {error ? "Error" : "Follow"}
    </button>
  );
}

FollowButton.propTypes = {
  name: PropTypes.string.isRequired,
};
