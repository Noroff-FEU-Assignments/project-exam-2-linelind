import Heading from "../layout/Heading";
import CreatePost from "./posts/CreatePost";
import PostList from "./posts/PostList";

export default function FeedPage() {
  return (
    <>
      <div className='pageContainer'>
        <Heading title='Feed' />
        <CreatePost />
        <PostList />
      </div>
    </>
  );
}
