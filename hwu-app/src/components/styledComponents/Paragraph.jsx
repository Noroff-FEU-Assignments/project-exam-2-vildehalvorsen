import styled from "styled-components";
import typography from "../../theme/typography";
import device from "../../theme/device";

const Paragraph = styled.p`
  font-family: ${typography.body.fontFamily};
  font-size: ${(props) => {
    if (props.xsmall) return typography.body.xsmall;
    if (props.small) return typography.body.small;
    if (props.medium) return typography.body.medium;
    if (props.large) return typography.body.large;
    return typography.body.small;
  }};
  text-align: ${(props) => {
    if (props.align === "right") return "right";
    if (props.align === "center") return "center";
    return "left";
  }};
  margin: ${(props) => {
    if (props.m0) return "none";
    if (props.m5) return "5px";
    if (props.ml30) return "0 0 5px 30px";
    return "0 0 5px";
  }};
  word-break: break-word;
  
  
  @media (${device.mobileS}) {
    font-size: ${typography.body.mobileSize};
  }
  
  @media (${device.tablet}) {
    font-size: ${typography.body.tabletSize};
  }
  
  @media (${device.laptop}) {
    font-size: ${typography.body.laptopSize};
  }
`;

export { Paragraph };
