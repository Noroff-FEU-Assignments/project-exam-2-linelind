import React from "react";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <a href='/'>Login</a>
        </li>
        <li>
          <a href='/feed'>Feed</a>
        </li>
        <li>
          <a href='/profile'>Profile</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
