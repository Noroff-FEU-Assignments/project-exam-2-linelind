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
      <Link to='/feed'>Feed</Link>

      {auth ? (
        <>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <Link to='/'>Login</Link>
      )}
    </nav>
  );
}

export default NavBar;
