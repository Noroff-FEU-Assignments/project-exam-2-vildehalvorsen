import styled, { keyframes, css } from "styled-components";
import colors from "../../theme/colors";
import typography from "../../theme/typography";
import { device } from "../../theme/device";

const curtainAnimationMobile = keyframes`
25% {
  border-radius: 0;
}
100% {
  top: 100%;
  bottom: 0;
  height: 0;
  min-height: 0;
  border-radius: 0;
}
`;

const curtainAnimationToRight = keyframes`
from {
  left: ${({ position }) => (position ? "initial" : "0")};
  right: ${({ position }) => (position ? "0" : "initial")};
  width: 100%;
  border-radius: ${({ position }) => (position ? "0 0 0 100%" : "0 0 100%")};
}
to {
  left: ${({ position }) => (position ? "initial" : "0")};
  right: ${({ position }) => (position ? "0" : "initial")};
  width: 65%;
  border-radius: ${({ position }) => (position ? "0 0 0 100%" : "0 0 100%")};
}
`;

const curtainAnimationToLeft = keyframes`
from {
  left: ${({ position }) => (position ? "initial" : "0")};
  right: ${({ position }) => (position ? "0" : "initial")};
  width: 100%;
  border-radius: ${({ position }) => (position ? "0 0 0 100%" : "0 0 100%")};
}
to {
  left: ${({ position }) => (position ? "initial" : "0")};
  right: ${({ position }) => (position ? "0" : "initial")};
  width: 65%;
  border-radius: ${({ position }) => (position ? "0 0 0 100%" : "0 0 100%")};
}
`;

const disappearAnimation = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  form {
    z-index: 10;
    margin-bottom: 0;
    width: 250px;
  }

  a {
    z-index: 10;
    font-family: ${typography.links.fontFamily};
    color: ${colors.black};
    font-size: ${typography.links.fontSize};
    text-align: center;
  }

  a:hover {
    color: ${colors.primaryHover};
  }

  @media (${device.laptop}) {
    form {
      position: absolute;
      top: 35%;
      left: ${({ position }) => (position ? "10%" : "initial")};
      right: ${({ position }) => (position ? "initial" : "10%")};
      margin: 0;
    }

    a {
      color: ${colors.white};
      text-decoration: none;
    }

    .mobileLink {
      display: none;
    }
  }
`;

const MobileCurtain = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-width: 330px;
  height: 100%;
  min-height: 450px;
  max-height: 550px;
  border-radius: 0 0 40% 54%;
  background-color: ${colors.primary};
  animation: ${({ active }) => (active ? curtainAnimationMobile : "none")} 2s
    forwards;

  h1 {
    text-align: center;
    font-size: 50px;
    margin: 50px auto;
    animation: ${({ active }) => (active ? disappearAnimation : "none")} 0.2s
      forwards;
  }

  .btnContainer {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    animation: ${({ active }) => (active ? disappearAnimation : "none")} 0.2s
      forwards;
  }

  @media (${device.laptop}) {
    display: none;
  }
`;

const CurtainTop = styled.div`
  z-index: 1;
  height: 190px;
  width: 100%;
  border-radius: 0 0 95%;
  background-color: ${colors.primary};

  > div {
    z-index: 100;
    position: relative;
    top: 15%;
    margin-left: 30px;
  }
  
  h1 {
    font-size: 40px;
    line-height: 1;
  }

  .laptopLink {
    display: none;
  }

  @media (${device.mobileL}) {
    height: 200px;
    border-radius: 0 0 80%;

    > div {
      margin-left: 40px;
    }
    
    h1 {
      font-size: 45px;
    }
  }

  @media (${device.tablet}) {
    height: 250px;
    border-radius: 0 0 70%;
    
    > div {
      margin-left: 60px;
    }
    
    h1 {
      font-size: 50px;
    }
  }

  @media (${device.laptop}) {
    z-index: 100;
    position: fixed;
    top: 0;
    left: ${({ position }) => (position ? "initial" : "0")};
    right: ${({ position }) => (position ? "0" : "initial")};
    bottom: 0;
    height: 100%;
    min-height: 600px;
    width: 65%;
    border-radius: ${({ position }) => (position ? "0 0 0 100%" : "0 0 100%")};
    animation: ${({active }) => (active ? curtainAnimationToLeft : curtainAnimationToRight)} 1s ease-in-out;

    > div {
      z-index: 1000;
      position: relative;
      top: ${({ position }) => (position ? "28%" : "22%")};
      left: ${({ position }) => (position ? "42%" : "24%")};
      margin-left: 0;
  }
    
    h1 {
      z-index: 1000;
      font-size: 100px;
      transform: none;
      margin: 0 0 10px;
      width: fit-content;
    }

    .laptopLink {
      z-index: 1100;
      display: inline;
      position: relative;
      font-size: 18px;
      font-weight: 500;
    }
  }
`;

export { Container, MobileCurtain, CurtainTop };
