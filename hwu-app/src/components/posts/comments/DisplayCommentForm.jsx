import axios from "axios";
import { useForm } from "react-hook-form";
import { BASE_URL, POSTS_PATH } from "../../../constants/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import defaultAvatar from "../../../images/avatar_default.jpg";
import { CommentAvatar } from "../../styledComponents/Avatars";
import {
  PostCommentForm,
  PostCommentTextarea,
} from "../../styledComponents/Posts";
import { CommentSubmitBtn } from "../../styledComponents/Buttons";

export default function DisplayCommentForm({
  postId,
  accessToken,
  onCommentAdded,
  imageSrc,
  showAlert,
  isCommenting,
}) {
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
      showAlert("Something went wrong trying to add comment", "error");
    }
  }

  return (
    <PostCommentForm id="commentForm" onSubmit={handleSubmit(submitNewComment)}>
      <CommentAvatar
        src={imageSrc ? imageSrc : defaultAvatar}
        alt="Profile avatar"
      />
      <label htmlFor="comment" hidden>
        Comment
      </label>
      <PostCommentTextarea
        id="comment"
        name="comment"
        placeholder="Write a comment..."
        autoFocus={isCommenting}
        {...register("body")}
      />
      <CommentSubmitBtn id="commentBtn" disabled={!isDirty}>
        <FontAwesomeIcon icon={faCaretRight} />
      </CommentSubmitBtn>
    </PostCommentForm>
  );
}
