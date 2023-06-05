import styled from "styled-components";
import colors from "../../theme/colors";
import borders from "../../theme/borders";
import typography from "../../theme/typography";
import device from "../../theme/device";

const ButtonPrimary = styled.button`
  font-family: ${typography.button.fontFamilyNormal};
  font-size: 11px;
  text-align: center;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: ${borders.mainBorder};
  padding: 10px;
  cursor: pointer;
  width: 100px;

  &:hover {
    background-color: ${colors.primaryHover};
  }
  
  &:disabled {
    background-color: ${colors.gray};
    cursor: initial;
  }
`;

const ButtonSecondary = styled.button`
  font-family: ${typography.button.fontFamilyNormal};
  font-size: 11px;
  text-align: center;
  background-color: ${colors.white};
  color: ${colors.primary};
  border: 1.5px solid ${colors.primary};
  border-radius: ${borders.mainBorder};
  padding: 10px;
  cursor: pointer;
  width: 100px;

  &:hover {
    background-color: ${colors.softPrimary};
  }
  
  &:disabled {
    background-color: ${colors.white};
    border-color: ${colors.gray};
    color: ${colors.gray};
    cursor: initial;
  }
`;

const BrowseBtn = styled(ButtonPrimary)`
  font-weight: bolder;
  width: 100px;
`;

const PostCommentBtn = styled(ButtonPrimary)`
  border-left: 1px solid ${colors.white};
  width: 100%;
  height: 40px;

  border-radius: ${(props) => {
    if (props.borderNone) return "0";
    return "0 0 20px 0";
  }};
`;

const PostReactionBtn = styled(ButtonPrimary)`
  border-right: 1px solid ${colors.white};
  width: 100%;
  height: 40px;

  border-radius: ${(props) => {
    if (props.borderNone) return "0";
    return "0 0 0 20px";
  }};
`;

const ExitBtn = styled.button`
  appearance: none;
  background: none;
  border: none;
  font-size: 20px;
  color: ${colors.black};
  float: right;
  cursor: pointer;
  margin: -10px;

  &:hover {
    color: ${colors.primaryHover};
  }
`;

const CreatePostBtn = styled.button`
  appearance: none;
  background: none;

  border-radius: ${borders.mainBorder};
  border: 1px solid ${colors.gray};
  padding: 10px;
  margin-top: 50px;
  width: 100%;
  max-width: 500px;
  cursor: text;
  color: ${colors.gray};
  text-align: left;
  
  @media (${device.laptop}) {
    margin-top: 0;
    margin-bottom: 50px;
    }
`;

const EditBtn = styled.button`
  appearance: none;
  background: ${colors.white};
  border: none;
  color: ${colors.primary};
  margin: 0 10px 10px 0;
  cursor: pointer;

  &:hover {
    background-color: ${colors.softPrimary};
  }
`;

const DeleteBtn = styled(EditBtn)`
  color: ${colors.error};
`;

const EditImageBtn = styled(EditBtn)`
  border: 1px solid ${colors.primary};
  border-radius: 50%;
  padding: 5px 7px 6px;
`;

const FollowBtn = styled(ButtonSecondary)`
  width: 63px;
`;

const LogoutBtn = styled(FollowBtn)`
color: ${colors.error};
border-color: ${colors.error};
padding: 10px 0;

&:hover {
  background-color: ${colors.softError};
}
`;

export {
  ButtonPrimary,
  ButtonSecondary,
  BrowseBtn,
  PostCommentBtn,
  PostReactionBtn,
  ExitBtn,
  CreatePostBtn,
  EditBtn,
  DeleteBtn,
  EditImageBtn,
  FollowBtn,
  LogoutBtn,
};
