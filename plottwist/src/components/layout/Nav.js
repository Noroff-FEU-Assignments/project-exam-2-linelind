import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);

  function logout() {
    setAuth(null);
    window.location.reload();
  }

  return (
    <nav>
      <div>
        <Link to='/feed' className='logo'>
          PlotTwist
        </Link>
      </div>
      <div>
        {auth ? (
          <>
            <button onClick={logout} className='logOutBtn'>
              Log out
            </button>
          </>
        ) : (
          <Link to='/' className='logInBtn'>
            Login
          </Link>
        )}
        <Link to='/myprofile'>
          <i className='fa-solid fa-user'></i>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
