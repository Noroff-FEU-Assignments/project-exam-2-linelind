import Breadcrumb from "react-bootstrap/Breadcrumb";
import PropTypes from "prop-types";

export default function BreadcrumbNav(props) {
  return (
    <Breadcrumb className='navBreadcrumb'>
      <Breadcrumb.Item href={`${props.path}`}>{props.title}</Breadcrumb.Item>
      <Breadcrumb.Item active className='breadcrumb-item active'>
        {props.current}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

Breadcrumb.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
};
