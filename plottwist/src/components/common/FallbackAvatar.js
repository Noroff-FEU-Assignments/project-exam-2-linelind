import defaultAvatar from "../../../assets/images/fallbackavatar.jpg";

export default function Avatar(props) {
  return <img src={props.image !== "" && props.image !== null ? props.image : defaultAvatar} alt={props.alt + `'s avatar`} />;
}
