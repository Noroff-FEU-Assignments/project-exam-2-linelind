import React from "react";
import LoginForm from "../components/login/LoginForm";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import FeedPage from "./FeedPage";

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
