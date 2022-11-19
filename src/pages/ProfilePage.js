import ProfileDetail from "../components/profiles/ProfileDetail";
import LoginPage from "./LoginPage";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import ProfilePosts from "../components/profiles/ProfilePosts";

export default function ProfilePage() {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='profileContainer pageContainer '>
        <ProfileDetail />
        <ProfilePosts />
      </div>
    );
  }
}
