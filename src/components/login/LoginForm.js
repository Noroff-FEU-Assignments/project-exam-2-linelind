import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { API_BASE } from "../../constant/api";
import AuthContext from "../../context/AuthContext";

const url = API_BASE + "/social/auth/login";

const schema = yup.object().shape({
  email: yup.string().required("Please enter your registered email").email("Please enter a valid email"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      history("/feed");
    } catch (error) {
      const displayMessage = <div>Well this is awkward. Quick, try again, and hopefully we can pretend like this error never happened.</div>;
      setLoginError(displayMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form loginForm'>
      {loginError && <div className='errorMessage'>{loginError}</div>}
      <p className='logo logInLogo'>PlotTwist</p>
      <label>
        Email
        <input {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </label>
      <label>
        Password
        <input {...register("password")} type='password' />
        {errors.password && <span>{errors.password.message}</span>}
      </label>
      <button className='cta loginBtn'>Log in</button>
      <hr></hr>
      <Link to='/register' className='cta newAccountBtn'>
        Create new account
      </Link>
    </form>
  );
}