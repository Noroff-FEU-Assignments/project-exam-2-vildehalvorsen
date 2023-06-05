import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

import { BASE_URL, POSTS_PATH } from "../../../constants/api";
import CommentForm from "../comments/CommentForm";
import HandleReactions from "../reactions/HandleReactions";
import defaultAvatar from "../../../images/avatar_default.jpg";

import { PostAvatar, CommentAvatar } from "../../styledComponents/Avatars";
import { ExitBtn, PostCommentBtn } from "../../styledComponents/Buttons";
import {
  PostBtnContainer,
  PostCommentList,
  PostContentWrapper,
  PostImage,
  PostLink,
  PostDate,
} from "../../styledComponents/Posts";
import { ModalPost, StyledModal } from "../../styledComponents/Modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Heading3, Heading4 } from "../../styledComponents/Headings";
import { Paragraph } from "../../styledComponents/Paragraph";
import { FlexContainer } from "../../styledComponents/Containers";
import LoadingIndicator from "../../common/LoadingIndicator";

export default function PostsModal({
  isOpen,
  onRequestClose,
  post,
  accessToken,
  setIsModified,
  showAlert,
}) {
  const url =
    BASE_URL +
    POSTS_PATH +
    `/${post}?_author=true&_comments=true&_reactions=true`;

  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(true);

  useEffect(() => {
    fetchPostData();
  }, [accessToken, url]);

  async function fetchPostData() {
    setIsModified(false);

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(url, options);
      setPostData(response.data);
      setReactions(response.data.reactions);
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  const handleCommentAdded = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
    setIsModified(true);
  };

  const getInitialCount = () => {
    const obj = reactions.find((item) => item.symbol === "👍");
    if (obj) {
      return obj.count;
    } else {
      return 0;
    }
  }
  
  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName={"customOverlay"}>
      <ExitBtn onClick={onRequestClose}>
        <FontAwesomeIcon icon={faXmark} />
      </ExitBtn>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Paragraph align="center">{error}</Paragraph>
      ) : (
        <div className="container">
        <ModalPost>
          <PostContentWrapper>
            <PostLink to={`/profiles/${postData.author.name}`}>
              <PostAvatar
                src={
                  postData.author.avatar
                    ? postData.author.avatar
                    : defaultAvatar
                }
                alt="Profile avatar"
              />
              <div>
                <Heading4>{postData.author.name}</Heading4>
                <PostDate>
                  {new Date(postData.created).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </PostDate>
              </div>
            </PostLink>
            <div>
              <Heading3>{postData.title}</Heading3>
              {postData.media && (
                <PostImage src={postData.media} alt="Post media" />
              )}
              <Paragraph small>{postData.body}</Paragraph>
            </div>
          </PostContentWrapper>
          <PostBtnContainer>
            <HandleReactions
              postId={postData.id}
              initialCount={getInitialCount}
              setIsModified={setIsModified}
              isOpen={isOpen}
            />
            <div>
              {postData._count.comments === 0 ? null : (
                <Paragraph align="right" xsmall m5>
                  {postData._count.comments}{" "}
                  {postData._count.comments === 1 ? "comment" : "comments"}
                  </Paragraph>
              )}
              <PostCommentBtn borderNone>
                Comment
              </PostCommentBtn>
            </div>
          </PostBtnContainer>
          <div>
            {comments.map((comment) => {
              return (
                <PostCommentList key={comment.id}>
                  <FlexContainer>
                    <PostLink to={`/profiles/${comment.author.name}`} title={comment.author.name}>
                    <CommentAvatar
                      src={
                        comment.author.avatar
                          ? comment.author.avatar
                          : defaultAvatar
                      }
                      alt="profile avatar"
                    />
                    <Paragraph small>{comment.author.name}</Paragraph>
                    </PostLink>
                  </FlexContainer>
                  <Paragraph xsmall ml30>{comment.body}</Paragraph>
                </PostCommentList>
              );
            })}
            <CommentForm
              accessToken={accessToken}
              postId={postData.id}
              onCommentAdded={handleCommentAdded}
              imageSrc={auth.avatar}
              showAlert={showAlert}
              isCommenting={isCommenting}
            />
          </div>
        </ModalPost>
        </div>
      )}
    </StyledModal>
  );
}
