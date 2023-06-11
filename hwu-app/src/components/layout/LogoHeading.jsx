import React from "react";
import PropTypes from "prop-types";
import { Heading1 } from "../styledComponents/Headings";
export function LogoHeading(props) {
  return (
    <>
      <Heading1 white>
        <span>{props.line1}</span>
        <br />
        <span>{props.line2}</span>
        <br />
        <span>{props.line3}</span>
      </Heading1>
    </>
  );
}

export function LogoBannerHeading(props) {
  return (
    <div className="bannerLogo">
      <div className="line1">
        <p>{props.line1}</p>
      </div>
      <div className="line2">
        <p>{props.line2}</p>
      </div>
      <div className="line3">
        <p>{props.line3}</p>
      </div>
    </div>
  );
}

LogoHeading.propTypes = {
  line1: PropTypes.string,
  line2: PropTypes.string,
  line3: PropTypes.string,
};

LogoBannerHeading.propTypes = {
  line1: PropTypes.string,
  line2: PropTypes.string,
  line3: PropTypes.string,
};
