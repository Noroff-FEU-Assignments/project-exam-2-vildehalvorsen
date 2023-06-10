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

  @media (${device.tablet}) {
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 800px;
    height: fit-content;
    border-radius: ${borders.mainBorder};
    padding: 40px;
  }
`;

const StyledPostModal = styled(Modal)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  overflow-y: auto;
  background: ${colors.white};
  
  @media (${device.laptop}) {
    top: 70px;
    left: 50%;
    right: initial;
    bottom: 70px;
    transform: translateX(-50%);
    background: none;
    border-radius: ${borders.mainBorder};
    width: 80vw;
    height: 80vh;
  }
`;

const ModalPost = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  min-height: 400px;
  min-width: 280px;
  max-width: 500px;
  overflow-y: auto;
  margin: 65px auto;

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
  
  @media (min-width: 500px) {
    border-radius: ${borders.mainBorder};
    filter: drop-shadow(0 3px 4px ${colors.gray});
  }
  
  @media (${device.tablet}) {  
    .modalContent_main {
      max-height: 300px;
    }
  }
  
  @media (${device.laptop}) {
    display: grid;
    grid-template-areas:
    "post reactions"
    "post comments"
    "post form";
    grid-template-columns: 60% 40%;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    max-width: none;
    height: fit-content;
    filter: none;
    padding: 50px 0;
    margin: 0;
     
    .modalContent_main {
      grid-area: post;
      max-height: none;
      height: 95%;
      width: 100%
      max-width: 500px;
      padding: 0 20px;
      margin-right: 0;
      border-right: 2px solid ${colors.softPrimary}
    }
    
    .modalContainer_reactions {
      grid-area: reactions;
      margin-top: 20px;
      position: relative;
    }
    
    .modalContainer_commentsList {
      grid-area: comments;
      max-height: 400px;
    }
    
    .modalsContainer_commentForm {
      grid-area: form;
    }
  }
  
`;

export { StyledModal, StyledPostModal, ModalPost };
