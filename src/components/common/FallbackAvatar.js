import fallbackAvatar from "../../../assets/images/fallbackavatar.jpg";

export default function FallbackAvatar(image) {
  if (image.image === "" || image.image === null) {
    return <img src={fallbackAvatar} alt='Profile image' />;
  }
}
