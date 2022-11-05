import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

export default function DeletePostButton({ id }) {
  const [error, setError] = useState(null);

  const http = useAxios();
  const history = useNavigate();

  const url = `/social/posts/${id}`;

  async function handleDelete() {
    try {
      await http.delete(url);
      history("/feed");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <button type='button' className='delete' onClick={handleDelete}>
      {error ? "Error" : "Delete"}
    </button>
  );
}

DeletePostButton.propTypes = {
  id: PropTypes.number.isRequired,
};
