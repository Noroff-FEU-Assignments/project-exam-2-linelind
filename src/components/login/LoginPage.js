import React from "react";
import Heading from "../layout/Heading";
import LoginForm from "./LoginForm";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FeedPage from "../feed/FeedPage";

export default function LoginPage() {
  const [auth] = useContext(AuthContext);

  if (auth) {
    return <FeedPage />;
  } else {
    return (
      <div className='pageContainer'>
        <LoginForm />
      </div>
    );
  }
}
