import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
  symbol: yup.string(),
});

export default function ReactButton() {
  const [reaction, setReaction] = useState();
  const [error, setError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();
  let { symbol } = reaction;

  const http = useAxios();
  const urlReact = `/social/posts/${id}/react/${symbol}`;

  async function handleReact(data) {
    try {
      const response = await http.put(urlReact, data);
      console.log("response", response);
      setReaction("🔥");
    } catch (error) {
      setError(error.toString());
    }
  }

  return (
    <form onSubmit={handleSubmit(handleReact)}>
      <label>
        <input type='hidden' {...register("symbol")} value={"🔥"} />
      </label>
      <button>🔥</button>
    </form>
  );
}
