import styled, { keyframes } from "styled-components";
import colors from "../../theme/colors";
import borders from "../../theme/borders";

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
  background-color: ${colors.white};
  padding: 50px;
  border-radius: ${borders.mainBorder};
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  svg {
    animation: ${spinAnimation} 1.2s linear infinite;
  }
  
`;


export { StyledLoader };
