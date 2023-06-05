import styled from "styled-components";
import colors from "../../theme/colors";
import borders from "../../theme/borders";
import device from "../../theme/device";
import Modal from "react-modal";

const StyledModal = styled(Modal)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.white};
  padding: 40px;
  
  .container {
    overflow: scroll;
    margin: 50px auto;
  }
  
  
  @media ${device.tablet} {
    top: 50%;
    left: 50%;
    right: none;
    bottom: none;
    width: 80%;
    transform: translate(-50%, -50%);
    border-radius: ${borders.mainBorder};
    
    .container {
      // width: 600px;
      height: 100px;
    }
  }
`;

const ModalPost = styled.div`
  border: 1px solid ${colors.gray};
  border-radius: ${borders.mainBorder};
  color: ${colors.black};
`;

export { StyledModal, ModalPost };
