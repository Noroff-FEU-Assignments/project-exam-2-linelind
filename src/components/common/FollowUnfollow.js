import { useEffect, useState } from "react";
import FollowButton from "../common/FollowButton";
import UnfollowButton from "../common/UnfollowButton";

export default function FollowUnfollow({ followings, authorName }) {
  const [inFollowings, setInFollowings] = useState(false);

  useEffect(() => {
    const nameInFollowings = followings.find((follow) => follow.name === authorName);
    if (nameInFollowings) {
      setInFollowings(true);
    }
  }, []);

  if (inFollowings) {
    return <UnfollowButton name={authorName} setInFollowings={setInFollowings} />;
  }

  return <FollowButton name={authorName} setInFollowings={setInFollowings} />;
}
