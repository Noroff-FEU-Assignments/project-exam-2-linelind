import defaultBanner from "../../../assets/images/fallbackbanner.jpg";

export default function Banner(props) {
  return <div style={{ backgroundImage: `url(${props.image !== "" && props.image !== null ? props.image : defaultBanner})` }}>{props.children}</div>;
}
