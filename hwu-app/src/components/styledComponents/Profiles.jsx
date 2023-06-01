import styled from "styled-components";
import colors from "../../theme/colors";

const ProfilesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > ul {
    display: flex;
    padding: 20px 0;
    overflow: scroll;

    > li {
      margin: 0 10px;
      text-align: center;
      width: 120px;

      > a {
        color: ${colors.black};
        text-decoration: none;
        
        > h4 {
          text-align: center;
          word-break: break-word;
          margin-top: auto;
        }
      }
    }
  }
  
  > div {
    display: flex;
    justify-content: center;
  }
`;

export { ProfilesListContainer };
