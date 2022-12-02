import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Heading from "../common/Heading";

function navMobile() {
  const navMobile = document.querySelector(".navMobile");
  navMobile.classList.toggle("hidden");
}

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);
  const [windowWidth, setWindowWidth] = useState({
    windowWidth: window.innerWidth,
  });

  const detectWidth = () => {
    setWindowWidth({
      windowWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectWidth);

    return () => {
      window.removeEventListener("resize", detectWidth);
    };
  }, [windowWidth]);

  function logout() {
    setAuth(null);
    window.location.reload();
  }

  return (
    <>
      {(() => {
        if (window.innerWidth > 500) {
          return (
            <nav>
              <div className='navContainer'>
                <div className='navLinksContainer'>
                  <Link to='/feed' className='logo'>
                    PlotTwist
                  </Link>

                  <Link to='/feed'>Posts</Link>
                  <Link to='/profiles'>Profiles</Link>
                </div>
                <div className='navElementsContainer'>
                  {auth ? (
                    <>
                      <button onClick={logout} className='cta logOutBtn'>
                        Log out
                      </button>
                    </>
                  ) : (
                    <Link to='/' className='cta logInBtn'>
                      Login
                    </Link>
                  )}
                  <Link to='/myprofile'>
                    <i className='fa-solid fa-user'></i>
                  </Link>
                </div>
              </div>
            </nav>
          );
        } else {
          return (
            <nav>
              <div className='navContainer'>
                <div className='navLinksContainer'>
                  <Link to='/feed' className='logo'>
                    PlotTwist
                  </Link>
                </div>
                <div className='navElementsContainer'>
                  {auth ? (
                    <>
                      <button onClick={logout} className='cta logOutBtn'>
                        Log out
                      </button>
                    </>
                  ) : (
                    <Link to='/' className='cta logInBtn'>
                      Login
                    </Link>
                  )}{" "}
                  <div className='navMobile hidden'>
                    <div className='navMobileHeader'>
                      <Heading title='Menu' size={2} />
                      <p className='close' onClick={navMobile}>
                        Close <i className='fa-solid fa-xmark'></i>
                      </p>
                    </div>
                    <Link to='/myprofile'>My profile</Link>
                    <Link to='/feed'>Posts</Link>
                    <Link to='/profiles'>Profiles</Link>
                  </div>
                  <i className='fa-solid fa-bars' onClick={navMobile}></i>
                </div>
              </div>
            </nav>
          );
        }
      })()}
    </>
  );
}

export default NavBar;
