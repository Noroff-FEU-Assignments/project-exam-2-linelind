import { useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function FollowButton({ name }) {
  const [error, setError] = useState(null);

  const http = useAxios();

  async function handleFollow() {
    try {
      const response = await http.put("/social/profiles/" + { name } + "/follow");
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
