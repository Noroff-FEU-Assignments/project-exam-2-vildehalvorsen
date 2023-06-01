import { useContext } from "react";
import PostsModal from "../posts/modals/PostsModal";
import HandleReactions from "./reactions/HandleReactions";
import AuthContext from "../../context/AuthContext";
import EditPost from "./settings/EditPost";
import defaultAvatar from "../../images/avatar_default.jpg";

import { PostAvatar } from "../styledComponents/Avatars";
import { Heading3, Heading4 } from "../styledComponents/Headings";
import { Paragraph } from "../styledComponents/Paragraph";
import {
  PostCard,
  PostLink,
  PostDate,
  PostImage,
  PostContentWrapper,
  PostBtnContainer,
} from "../styledComponents/Posts";

import { PostCommentBtn } from "../styledComponents/Buttons";
import {
  FlexContainer,
  SectionContainer,
} from "../styledComponents/Containers";

export default function PostsListHtml({
  posts,
  limit,
  selectedPost,
  accessToken,
  postModalIsOpen,
  handleCloseModal,
  handleOpenModal,
  handlePostModification,
  setIsModified,
  showAlert,
}) {
  const [auth] = useContext(AuthContext);

  if (posts.length === 0)
    return (
      <SectionContainer>
        <Paragraph align="center">
          The user hasn't published any posts yet
        </Paragraph>
      </SectionContainer>
    );

  return (
    <>
      <SectionContainer>
        <ul>
          {posts.slice(0, limit).map((post) => {
            const {
              id,
              title,
              body,
              media,
              created,
              _count,
              author,
              reactions,
            } = post;
            const date = new Date(created);
            const convertedDate = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            function getInitialCount() {
              const obj = reactions.find((item) => item.symbol === "👍");
              if (obj) {
                return obj.count;
              } else {
                return 0;
              }
            }

            return (
              <PostCard key={id}>
                <PostContentWrapper>
                  <FlexContainer spaceBetween>
                    <PostLink to={`/profiles/${author.name}`}>
                      <PostAvatar
                        src={author.avatar ? author.avatar : defaultAvatar}
                        alt="Profile avatar"
                      />
                      <div>
                        <Heading4>{author.name}</Heading4>
                        <PostDate>{convertedDate}</PostDate>
                      </div>
                    </PostLink>
                    {auth.name === author.name && (
                      <EditPost
                        postData={post}
                        handlePostModification={handlePostModification}
                        showAlert={showAlert}
                      />
                    )}
                  </FlexContainer>
                  <div>
                    <Heading3>{title}</Heading3>
                    {media && <PostImage src={media} alt="Post media" />}
                    <Paragraph small>{body}</Paragraph>
                  </div>
                </PostContentWrapper>
                <PostBtnContainer>
                  <HandleReactions
                    postId={id}
                    initialCount={getInitialCount}
                    setIsModified={setIsModified}
                  />
                  <div>
                    {_count.comments === 0 ? null : (
                      <Paragraph align="right" xsmall m5>
                        {_count.comments}{" "}
                        {_count.comments === 1 ? "comment" : "comments"}
                      </Paragraph>
                    )}
                    <PostCommentBtn onClick={() => handleOpenModal(id)}>
                      Comment
                    </PostCommentBtn>
                  </div>
                </PostBtnContainer>
              </PostCard>
            );
          })}
        </ul>
      </SectionContainer>
      {selectedPost && (
        <PostsModal
          post={selectedPost}
          accessToken={accessToken}
          isOpen={postModalIsOpen}
          onRequestClose={handleCloseModal}
          setIsModified={setIsModified}
          showAlert={showAlert}
        />
      )}
    </>
  );
}
