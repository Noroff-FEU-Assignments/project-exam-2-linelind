export default function PostImgSize(image) {
  const imageHeight = "300px";
  const noImage = "0";

  return <div style={{ backgroundImage: `url(${image.image})`, height: `${image.image !== "" && image.image !== null ? imageHeight : noImage}` }}></div>;
}
