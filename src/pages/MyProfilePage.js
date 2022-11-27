import ProfileInfo from "../components/myprofile/MyProfileInfo";
import LoginPage from "./LoginPage";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import MyProfileMenu from "../components/myprofile/MyProfileMenu";

export default function ProfilePage() {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='profileContainer pageContainer '>
        <ProfileInfo />
        <MyProfileMenu />
      </div>
    );
  }
}
