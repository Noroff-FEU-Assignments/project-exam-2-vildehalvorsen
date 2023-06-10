import styled, { keyframes } from "styled-components";
import device from "../../theme/device";
import colors from "../../theme/colors";

const appearAnimation = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const BodyContainer = styled.div`
opacity: 0;
animation: ${appearAnimation} .5s forwards .5s;

  @media (${device.laptop}) {
    margin-top: 47.6px;
    
    .profile__topContent {
      margin-bottom: 70px;
    }
  }
`;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (${device.mobileL}) {
    width: 90%;
    margin: 0 auto;
  }

  @media (${device.laptop}) {
    float: right;
    width: 70%;
    border-left: 2px solid ${colors.softPrimary};
    margin-top: 50px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => {
    if (props.spaceBetween) return "space-between";
    if (props.center) return "center";
    return "initial";
  }};
`;

const SectionContainer = styled.div`
  margin: 50px 0;

  @media (${device.laptop}) {
    margin: 0 0 50px;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  min-height: 175px;
  min-width: 170px;
  text-align: center;

  > div {
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: -35px;
    max-width: 170px;
    margin-bottom: -35px;
  }

  @media (${device.laptop}) {
    position: absolute;
    top: 360px;
    left: 120px;
    transform: none;
  }
`;

const FollowBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: -42px;
  margin-right: 10px;

  @media (min-width: 500px) {
    margin-right: 3%;
  }
`;

const EditBannerBtnContainer = styled.div`
  position: absolute;
  margin: 10px;
`;

const FollowerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    height: 50px;
    width: 120px;
    margin: 0 10px;

    h4 {
      margin: 5px;
    }
  }

  @media (${device.laptop}) {
    float: left;
    flex-direction: column;
    align-items: start;
    width: auto;
    margin: 50px;
    position: absolute;

    > div {
      height: 100%;
      width: fit-content;
      margin-bottom: 20px;

      h4 {
        text-align: left;
      }
    }
  }
`;

const FollowerListContainer = styled.div`
  display: flex;
  width: 120px;
  justify-content: center;
  overflow: scroll;

  > *:not(:first-child) {
    margin-left: -15px;
  }

  @media (${device.laptop}) {
    flex-wrap: wrap;
    width: 150px;
    max-height: 300px;
    justify-content: start;

    > *:not(:first-child) {
      margin: 0 5px;
    }

    > :first-child {
      margin: 0 5px;
    }
  }
`;

export {
  BodyContainer,
  Container,
  FlexContainer,
  SectionContainer,
  AvatarContainer,
  FollowBtnContainer,
  FollowerContainer,
  FollowerListContainer,
  EditBannerBtnContainer,
};
