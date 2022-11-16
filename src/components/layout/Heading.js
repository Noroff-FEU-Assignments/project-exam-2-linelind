import PropTypes from "prop-types";

function Heading({ size = "1", title }) {
  const HeadingSize = `h${size}`;

  return <HeadingSize>{title}</HeadingSize>;
}

Heading.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Heading;
