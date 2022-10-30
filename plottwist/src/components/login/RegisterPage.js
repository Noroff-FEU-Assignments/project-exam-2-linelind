import React from "react";
import Heading from "../layout/Heading";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className='pageContainer'>
      <Heading title='Create user' />
      <RegisterForm />
    </div>
  );
}
