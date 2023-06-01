import styled, { keyframes } from "styled-components";
import colors from "../../theme/colors";

const spinAnimation = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const StyledLoader = styled.div`
  font-size: 25px;
  color: ${colors.primary};
  text-align: center;
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  svg {
    animation: ${spinAnimation} 1.2s linear infinite;
  }
  
`;


export { StyledLoader };
