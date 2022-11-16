import Heading from "../layout/Heading";
import CreatePost from "./posts/CreatePost";
import PostList from "./posts/PostList";
import ProfileList from "./profiles/ProfileList";
import LoginPage from "../login/LoginPage";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function FeedPage() {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='pageContainer'>
        <h1>How's it going {auth.name}?</h1>
        <CreatePost />
        <PostList />
        <ProfileList />
      </div>
    );
  }
}
