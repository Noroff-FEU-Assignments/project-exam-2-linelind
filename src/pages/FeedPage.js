import CreatePost from "../components/posts/CreatePost";
import FeedMenu from "../components/layout/FeedMenu";
import LoginPage from "./LoginPage";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Heading from "../components/common/Heading";

export default function FeedPage() {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='pageContainer'>
        <Heading title={`How's it going` + auth.name + `?`} styling='feedTitle' />

        <CreatePost />
        <FeedMenu />
      </div>
    );
  }
}
