import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BASE_URL, POSTS_PATH } from "../../../constants/api";

export default function CommentForm({
  postId,
  accessToken,
  onCommentAdded,
  imageSrc,
  autoFocus,
}) {
  const [error, setError] = useState(null);
  const url = BASE_URL + POSTS_PATH;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      body: "",
    },
  });

  async function submitNewComment(data) {
    setError(null);

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
      reset();
      onCommentAdded(newComment);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    }
  }

  return (
    <form id="commentForm" onSubmit={handleSubmit(submitNewComment)}>
      <img src={imageSrc} alt="Profile avatar" />
      <label htmlFor="comment" hidden>
        Comment
      </label>
      <textarea
        id="comment"
        name="comment"
        placeholder="Write a comment..."
        autoFocus={autoFocus}
        {...register("body")}
      />
      <button id="commentBtn" disabled={!isDirty}>
        add
      </button>
    </form>
  );
}
