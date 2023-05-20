import { useContext } from "react";
import PostsModal from "../modal/PostsModal";
import HandleReactions from "./reactions/HandleReactions";
import AuthContext from "../../context/AuthContext";
import EditPost from "./settings/EditPost";
import defaultAvatar from "../../images/avatar_default.jpg";

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

  return (
    <>
      <ul>
        {posts.slice(0, limit).map((post) => {
          const { id, title, body, media, created, _count, author, reactions } =
            post;
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
            <li key={id} className="postsList__item">
              {auth.name === author.name && (
                <EditPost
                  postData={post}
                  handlePostModification={handlePostModification}
                  showAlert={showAlert}
                />
              )}
              <div>
                <img
                  src={author.avatar ? author.avatar : defaultAvatar}
                  alt="Profile avatar"
                />
                <p>{author.name}</p>
                <p>{convertedDate}</p>
              </div>
              <div>
                <h3>{title}</h3>
                {media && <img src={media} alt="Post media" />}
                <p>{body}</p>
              </div>
              <div>
                <HandleReactions
                  postId={id}
                  initialCount={getInitialCount}
                  setIsModified={setIsModified}
                />
                {_count.comments === 0 ? null : (
                  <p>{_count.comments} comments</p>
                )}
              </div>
              <div>
                <button id="commentBtn" onClick={() => handleOpenModal(id)}>
                  comment
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {selectedPost && (
        <PostsModal
          post={selectedPost}
          accessToken={accessToken}
          isOpen={postModalIsOpen}
          onRequestClose={handleCloseModal}
          setIsModified={setIsModified}
        />
      )}
    </>
  );
}
