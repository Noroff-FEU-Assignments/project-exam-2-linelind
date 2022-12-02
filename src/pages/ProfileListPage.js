import LoginPage from "./LoginPage";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Heading from "../components/common/Heading";
import ProfileList from "../components/profiles/ProfileList";

export default function ProfileListPage() {
  document.title = "PlotTwist | Profiles";

  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='pageContainer'>
        <Heading title='Profiles' styling='feedTitle' />
        <ProfileList />
      </div>
    );
  }
}
