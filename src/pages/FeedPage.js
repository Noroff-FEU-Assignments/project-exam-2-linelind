import CreatePost from "../components/posts/CreatePost";
import FeedMenu from "../components/layout/FeedMenu";
import LoginPage from "./LoginPage";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function FeedPage() {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='pageContainer'>
        <h1 className='feedTitle'>How's it going {auth.name}?</h1>
        <CreatePost />
        <FeedMenu />
      </div>
    );
  }
}
