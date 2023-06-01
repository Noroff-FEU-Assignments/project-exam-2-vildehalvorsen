import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
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
`;

const AvatarContainer = styled.div`
  position: relative;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;

  > div {
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: -35px;
    max-width: 170px;
    margin-bottom: -35px;
  }
`;

const FollowBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: -42px;
  margin-right: 10px;
`;

const EditBannerBtnContainer = styled.div`
position: absolute;
margin: 10px;
`;

const FollowerContainer = styled.div`
  height: 50px;
  width: 120px;
  margin: 0 10px;
`;

const FollowerListContainer = styled.div`
  display: flex;
  width: 120px;
  justify-content: center;
  overflow: scroll;

  > *:not(:first-child) {
    margin-left: -15px;
  }
`;

export {
  Container,
  FlexContainer,
  SectionContainer,
  AvatarContainer,
  FollowBtnContainer,
  FollowerContainer,
  FollowerListContainer,
  EditBannerBtnContainer,
};
