import CreatePost from "../components/feed/posts/CreatePost";
import PostList from "../components/feed/posts/PostList";
import ProfileList from "../components/feed/profiles/ProfileList";
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
        <h1>How's it going {auth.name}?</h1>
        <CreatePost />
        <PostList />
        <ProfileList />
      </div>
    );
  }
}
