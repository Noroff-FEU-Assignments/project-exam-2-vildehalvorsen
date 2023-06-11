import styled from "styled-components";
import colors from "../../theme/colors";
import device from "../../theme/device";

const ProfilesBrowser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 0 5px;

  > ul {
    display: flex;
    padding: 20px 0;
    width: 100%;
    height: 160px;
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
      height: 100%;
      li {
        width: 140px;
      }
    }
  }
`;

const ProfilesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  
  > ul {
    display: flex;
    flex-direction: column;
    width: 300px;

    li {
      width: 100%;
      max-width: fit-content;
      margin: 5px;
    }
    
    a {
      color: ${colors.black};
      text-decoration: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
    }
    
    img {
      width: 50px;
      height: 50px;
    }
    
    h4 {
      margin-left: 10px;
      word-break: break-word;
      text-align: left;
    }
  }
  
  @media (${device.tablet}) {
    > ul {
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      max-width: 800px;
  
      li {
        width: 100px;
        max-width: none;
        margin: 20px;
      }
      
      a {
        flex-direction: column;
      }
      
      img {
        width: 100px;
        height: 100px;
      }
      
      h4 {
        text-align: center;
        margin-top: auto;
        margin-left: 0;
      }
  }
`;

export { ProfilesBrowser, ProfilesListContainer };
