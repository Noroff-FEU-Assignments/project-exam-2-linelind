import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Breadcrumb(props) {
  return (
    <nav aria-label='breadcrumb' className='navBreadcrumb'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link to={`${props.path}`}>{props.title}</Link>
        </li>
        <li className='breadcrumb-item active'>Edit</li>
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
