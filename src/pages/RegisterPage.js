import React from "react";
import RegisterForm from "../components/login/RegisterForm";

export default function RegisterPage() {
  document.title = "PlotTwist | Register";

  return (
    <div className='pageContainer'>
      <RegisterForm />
    </div>
  );
}
