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
  z-index: 9999;
  overflow-y: auto;
  background: ${colors.white};

  .modalPostContent {
    position: relative;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 80vh;
    min-width: 280px;
    width: 100%;
    overflow-y: auto;
    padding: 10px 0;
  }
  
  @media (${device.mobileL}) {
    .modalPostContent {
      max-width: 500px;
      border: 1px solid ${colors.black};
      border-radius: ${borders.mainBorder};
    }
  }
  
  @media (${device.tablet}) {
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 800px;
    height: fit-content;
    border-radius: ${borders.mainBorder};
    padding: 40px;
    
    .modalPostContent {
      top: initial;
      left: initial;
      transform: none;
      margin: 40px auto;
      max-height: 80vh;
      min-width: 280px;
      width: 100%;
      overflow-y: auto;
      padding: 10px 0;
    }
  }
  }
`;

const ModalPost = styled.div`
  .modalContent_main {
    height: 100%;
    max-height: 250px;
    overflow-y: scroll;
  }

  .modalContainer_commentsList {
    height: 100%;
    max-height: 150px;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
  
  .modalsContainer_commentForm {
    background-color: ${colors.white};
    padding: 10px 20px;
    height: fit-content;
  }
`;

export { StyledModal, ModalPost };
