import ProfileInfo from "./MyProfileInfo";
import LoginPage from "../login/LoginPage";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import MyPosts from "./MyPosts";

export default function ProfilePage() {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='pageContainer'>
        <ProfileInfo />
        <MyPosts />
      </div>
    );
  }
}
