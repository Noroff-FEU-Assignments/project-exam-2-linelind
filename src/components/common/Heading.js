import PropTypes from "prop-types";

export default function Heading({ size = 1, title, styling }) {
  const HeadingSize = `h${size}`;
  return <HeadingSize className={styling}>{title}</HeadingSize>;
}

Heading.propTypes = {
  size: PropTypes.number,
  title: PropTypes.string.isRequired,
  styling: PropTypes.string,
};
