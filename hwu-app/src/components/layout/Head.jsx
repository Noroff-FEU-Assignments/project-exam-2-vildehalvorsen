import PropTypes from "prop-types";

export default function Head({ title = 'HWU' }) {
  document.title = title;
};


Head.propTypes = {
  title: PropTypes.string,
};

