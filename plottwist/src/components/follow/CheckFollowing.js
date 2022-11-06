import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function CheckFollowing() {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  const urlAxios = useAxios();
  const checkUrl = `/social/profiles/${auth.name}?_following=true&_followers=true`;

  async function checkFollowing() {
    try {
      const response = await urlAxios.get(checkUrl);
      console.log(response.data.following.name);
    } catch (error) {
      setError(error);
    }
  }
}
