import React from "react";
import Heading from "../layout/Heading";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className='pageContainer'>
      <Heading title='Login' />
      <LoginForm />
    </div>
  );
}
