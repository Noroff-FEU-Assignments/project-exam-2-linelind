import PropTypes from "prop-types";
import FallbackBanner from "../../images/fallbackbanner.jpg";

export default function Banner(props) {
  return (
    <div className='banner'>
      <img src={props.media !== "" && props.media !== null ? props.media : FallbackBanner} alt={`Banner image for` + " " + props.alt} />
    </div>
  );
}

Banner.propTypes = {
  media: PropTypes.string,
  alt: PropTypes.string,
};
