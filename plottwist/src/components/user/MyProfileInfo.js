import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function ProfileInfo() {
  const [auth] = useContext(AuthContext);

  return (
    <div className='pageContainer'>
      <p>{auth.name}</p>
      <p>{auth.email}</p>
    </div>
  );
}
