import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function ProfileInfo() {
  const [auth] = useContext(AuthContext);

  return (
    <div className='pageContainer'>
      <div>
        <img src={auth.banner} alt='Banner image' />
      </div>
      <div>
        <div>
          <img src={auth.avatar} alt='Profile avatar' />
        </div>
        <div>
          <h1>{auth.name}</h1>
          <p>{auth.email}</p>
        </div>
        <Link to={`/myprofile/edit/${auth.name}`}>
          <button>Edit profile</button>
        </Link>
      </div>
    </div>
  );
}
