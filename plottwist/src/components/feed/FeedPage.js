import Heading from "../layout/Heading";
import PostList from "./posts/PostList";

export default function FeedPage() {
  return (
    <>
      <div className='pageContainer'>
        <Heading title='Feed' />
        <PostList />
      </div>
    </>
  );
}
