import { useState } from "react";
import axios from "axios";
import { BASE_URL, POSTS_PATH } from "../../../constants/api";

export default function CommentForm({
  postId,
  accessToken,
  onCommentAdded,
  imageSrc,
  autoFocus,
}) {
  const [commentBody, setCommentBody] = useState("");

  const url = BASE_URL + POSTS_PATH;

  async function handleSubmit(event) {
    event.preventDefault();

    const data = { body: commentBody };

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.post(
        url + `/${postId}/comment`,
        data,
        options
      );
      const newComment = response.data;
      setCommentBody("");
      onCommentAdded(newComment);
    } catch (error) {
      console.log(error.toString());
    }
  }

  function handleInputChange(event) {
    setCommentBody(event.target.value);
  }

  return (
    <form id="commentForm" onSubmit={handleSubmit}>
      <img src={imageSrc} alt="Profile avatar" />
      <label htmlFor="comment">Comment</label>
      <textarea
        name="comment"
        value={commentBody}
        onChange={handleInputChange}
        placeholder="Write a comment..."
        autoFocus={autoFocus}
      />
      <button id="commentBtn" disabled={!commentBody.trim()}>
        add
      </button>
    </form>
  );
}
