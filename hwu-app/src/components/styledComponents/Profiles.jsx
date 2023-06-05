import styled from "styled-components";
import colors from "../../theme/colors";
import device from "../../theme/device";

const ProfilesBrowser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 0 5px;

  > ul {
    display: flex;
    padding: 20px 0;
    max-width: 1000px;
    overflow: scroll;

    li {
      margin: 0 10px;
      text-align: center;
      width: 120px;
    }

    a {
      color: ${colors.black};
      text-decoration: none;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    h4 {
      text-align: center;
      word-break: break-word;
      margin-top: auto;
    }
  }

  > div {
    display: flex;
    justify-content: center;
  }

  @media (${device.mobileL}) {
    margin: 50px 0;

    > ul {
      li {
        width: 140px;
      }
    }
  }
`;

const ProfilesListContainer = styled(ProfilesBrowser)`
  margin: 50px auto;
  
  > ul {
    flex-wrap: wrap;
    justify-content: center;

    li {
      margin: 10px;
    }
  }
`;

export { ProfilesBrowser, ProfilesListContainer };
