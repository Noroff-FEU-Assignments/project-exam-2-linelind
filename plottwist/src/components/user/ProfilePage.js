import Heading from "../layout/Heading";
import ProfileInfo from "./ProfileInfo";
import LoginPage from "../login/LoginPage";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function ProfilePage() {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='pageContainer'>
        <Heading title='Profile' />
        <ProfileInfo />
      </div>
    );
  }
}
