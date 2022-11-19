import ProfileInfo from "../components/myprofile/MyProfileInfo";
import LoginPage from "./LoginPage";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import MyPosts from "../components/myprofile/MyPosts";

export default function ProfilePage() {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='profileContainer pageContainer '>
        <ProfileInfo />
        <MyPosts />
      </div>
    );
  }
}
