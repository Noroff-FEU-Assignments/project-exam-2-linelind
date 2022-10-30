import Heading from "../layout/Heading";
import ProfileInfo from "./ProfileInfo";

export default function ProfilePage() {
  return (
    <div className='pageContainer'>
      <Heading title='Profile' />
      <ProfileInfo />
    </div>
  );
}