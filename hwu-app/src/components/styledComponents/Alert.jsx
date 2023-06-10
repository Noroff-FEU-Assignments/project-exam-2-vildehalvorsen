import styled from "styled-components";
import colors from "../../theme/colors";
import device from "../../theme/device";
import borders from "../../theme/borders";

const AlertMessageContainer = styled.div`
position: fixed;
top: 0;
left: 50%;
transform: translate(-50%);
display: flex;
justify-content: center;
margin: 20px 0;
z-index: 100000;

div {
  width: 300px;
  border: 2px solid ${colors.primary};
  border-radius: ${borders.mainBorder};
  background-color: ${colors.white};
  padding: 15px;
}
.error {
  background-color: ${colors.softError};
  color: ${colors.darkError};
  border-color: ${colors.error};
}

.success {
  background-color: ${colors.softSuccess};
  color: ${colors.darkSuccess};
  border-color: ${colors.success};
}


@media (${device.laptop}) {
  top: 50px;
}
`;


export { AlertMessageContainer };