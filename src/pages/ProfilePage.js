import ProfileDetail from "../components/profiles/ProfileDetail";
import LoginPage from "./LoginPage";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import ProfilePosts from "../components/profiles/ProfilePosts";
import ProfileMenu from "../components/profiles/ProfileMenu";

export default function ProfilePage() {
  document.title = "PlotTwist | View profile";

  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='profileContainer pageContainer '>
        <ProfileMenu />
      </div>
    );
  }
}
