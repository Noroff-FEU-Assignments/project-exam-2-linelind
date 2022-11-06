export default function PostImageSize(props) {
  const imageHeight = "300px";
  const noImage = "0";

  return <div style={{ backgroundImage: `url(${props.image})`, height: `${props.image !== "" && props.image !== null ? imageHeight : noImage}` }}></div>;
}
