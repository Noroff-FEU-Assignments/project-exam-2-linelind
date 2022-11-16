import fallbackBanner from "../../../assets/images/fallbackbanner.jpg";

export default function FallbackBanner(image) {
  if(image.image === "" || image.image === null) {
    return (
      <div style={backgroundImage: `url(${fallbackBanner})`}></div>;
    )
  }
}
