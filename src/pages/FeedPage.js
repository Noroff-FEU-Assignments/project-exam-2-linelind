import CreatePost from "../components/posts/CreatePost";
import PostList from "../components/posts/PostList";
import LoginPage from "./LoginPage";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Heading from "../components/common/Heading";

export default function FeedPage() {
  document.title = "PlotTwist | Feed";

  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <LoginPage />;
  } else {
    return (
      <div className='pageContainer'>
        <Heading title={`How's it going` + " " + auth.name + `?`} styling='feedTitle' />

        <CreatePost />
        <PostList />
      </div>
    );
  }
}
