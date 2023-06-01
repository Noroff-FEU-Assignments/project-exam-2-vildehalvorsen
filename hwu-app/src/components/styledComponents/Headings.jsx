import styled from "styled-components";
import typography from "../../theme/typography";
import colors from "../../theme/colors";

const Heading1 = styled.h1`
  font-family: ${typography.heading.h1.fontFamily};
  font-size: ${typography.heading.h1.fontSize};
  font-weight: ${typography.heading.fontWeight};
  line-height: 1em;
  color: ${(props) => {
    if (props.white) return colors.white;
    return colors.black;
  }};

  text-align: ${(props) => {
    if (props.align === "right") return "right";
    if (props.align === "center") return "center";
    return "left";
  }};
`;

const Heading2 = styled.h2`
  font-family: ${typography.heading.h2.fontFamily};
  font-size: ${(props) => props.fontSize || typography.heading.h2.fontSize};
  font-weight: ${typography.heading.fontWeight};
  color: ${(props) => props.color || colors.black};
  margin: 30px 0;

  text-align: ${(props) => {
    if (props.align === "right") return "right";
    if (props.align === "center") return "center";
    return "left";
  }};
`;

const Heading3 = styled.h3`
  font-family: ${typography.heading.h3.fontFamily};
  font-size: ${typography.heading.h3.fontSize};
  font-weight: ${typography.heading.h3.fontWeight};
  color: ${colors.black};
  margin: 10px 0;

  text-align: ${(props) => {
    if (props.align === "right") return "right";
    if (props.align === "center") return "center";
    return "left";
  }};
`;

const Heading4 = styled.h4`
  font-family: ${typography.heading.h4.fontFamily};
  font-size: ${typography.heading.h4.fontSize};
  font-weight: ${typography.heading.h4.fontWeight};
  color: ${colors.black};
  margin: 0;

  text-align: ${(props) => {
    if (props.align === "right") return "right";
    if (props.align === "center") return "center";
    return "left";
  }};
`;

const ProfileTitle = styled.h1`
  font-family: ${typography.heading.h1.fontFamily};
  font-size: ${typography.heading.h1.fontSize};
  font-weight: ${typography.heading.fontWeight};
  color: ${colors.black};
  text-align: center;
  margin-top: -115px;
  margin-bottom: 10px;
`;

export { Heading1, Heading2, Heading3, Heading4, ProfileTitle };
