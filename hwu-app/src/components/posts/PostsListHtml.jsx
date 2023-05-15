import PostsModal from "../modal/PostsModal";
import { useState } from "react";
import axios from "axios";
import { BASE_URL, POSTS_PATH } from "../../constants/api";
import HandleReactions from "./reactions/HandleReactions";

export default function PostsListHtml({
  posts,
  limit,
  selectedPost,
  accessToken,
  postModalIsOpen,
  handleCloseModal,
  handleOpenModal,
}) {
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
            if(obj) {
              console.log(obj.count);
              return obj.count;
            } else {
              return 0;
            }
          }
          
          return (
            <li key={id} className="postsList__item">
              <div>
                <p>{author.name}</p>
                <p>{convertedDate}</p>
              </div>
              <div>
                <h3>{title}</h3>
                {media && <img src={media} alt="Post media" />}
                <p>{body}</p>
              </div>
              <div>
                <HandleReactions postId={id} initialCount={getInitialCount} />
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
        />
      )}
    </>
  );
}
