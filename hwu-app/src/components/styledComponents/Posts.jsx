import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../theme/colors";
import borders from "../../theme/borders";
import typography from "../../theme/typography";

const PostCard = styled.li`
  border: 1px solid ${colors.gray};
  border-radius: ${borders.mainBorder};
  color: ${colors.black};
  margin-bottom: 50px;
  background-color: ${colors.white};
`;

const PostLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${colors.black};
  text-decoration: none;

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
`;

const PostBtnContainer = styled.div`
  display: flex;

  > div {
    flex: 1;
    align-self: flex-end;
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
  margin: 20px 5px;
  
  &:focus-within {
    outline: 2px solid ${colors.primary};
  }
`;

const PostCommentTextarea = styled.textarea`
  appearance: none;
  border: none;
  resize: none;
  background: none;
  height: 15px;
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
  PostCommentList,
  PostCommentForm,
  PostCommentTextarea,
  CommentSubmitBtn,
};
