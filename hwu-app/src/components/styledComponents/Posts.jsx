import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../theme/colors";
import borders from "../../theme/borders";
import typography from "../../theme/typography";
import device from "../../theme/device";

const PostCard = styled.li`
  border-radius: ${borders.mainBorder};
  color: ${colors.black};
  background-color: ${colors.white};
  width: 330px;
  padding-top: 5px;
  margin: 0 auto 50px;
  filter: drop-shadow(0 3px 4px ${colors.gray});
  
  @media (${device.mobileL}) {
    width: 400px;
  }
  
  @media (${device.tablet}) {
    width: 500px;
  }
`;

const PostLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${colors.black};
  text-decoration: none;
  width: fit-content;

  > div {
    margin-left: 5px;
  }
`;

const PostDate = styled.p`
  color: ${colors.link};
  font-family: ${typography.links.fontFamily};
  font-size: ${typography.links.fontSize};
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 350px;
  object-fit: contain;
`;

const PostContentWrapper = styled.div`
  margin: 10px;
  
  @media (${device.mobileL}) {
    margin: 20px;
  }
`;

const PostBtnContainer = styled.div`
  display: flex;
  margin-bottom: 5px;

  > div {
    flex: 1;
    align-self: flex-end;
  }
`;

const CommentsListContainer = styled.div`
position: relative;
height: 200px;
overflow-y: scroll;

> div {
  background-color: ${colors.white};
  position: sticky;
  bottom: 0;
  padding: 20px;
  height: fit-content;
}

`;

const PostCommentList = styled.li`
  border: 1px solid ${colors.gray};
  border-radius: ${borders.mainBorder};
  padding: 5px;
  margin: 20px;
  background: ${colors.lightGray};
`;

const PostCommentForm = styled.form`
  border: 1px solid ${colors.gray};
  border-radius: ${borders.mainBorder};
  background-color: ${colors.softPrimary};
  padding: 5px 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:focus-within {
    outline: 2px solid ${colors.primary};
  }
`;

const PostCommentTextarea = styled.textarea`
  appearance: none;
  border: none;
  resize: none;
  background: none;
  height: 25px;
  padding: 5px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const CommentSubmitBtn = styled.button`
  color: ${colors.primary};
  font-size: 18px;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 10px;

  &:disabled,
  &:disabled:hover {
    color: ${colors.gray};
  }

  &:hover {
    color: ${colors.primaryHover};
  }
`;

export {
  PostCard,
  PostLink,
  PostDate,
  PostImage,
  PostContentWrapper,
  PostBtnContainer,
  CommentsListContainer,
  PostCommentList,
  PostCommentForm,
  PostCommentTextarea,
  CommentSubmitBtn,
};
