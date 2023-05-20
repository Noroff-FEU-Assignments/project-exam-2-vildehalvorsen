import { useContext, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";

import { BASE_URL, POSTS_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

export default function CreatePostModal({
  isOpen,
  onRequestClose,
  handlePostModification,
  showAlert
}) {
  const [auth] = useContext(AuthContext);
  const accessToken = auth.accessToken;

  const url = BASE_URL + POSTS_PATH;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      media: "",
      body: "",
    }
  });

  async function submitCreatePost(data) {const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(url, data, options);
      if (response.status === 200) {
        reset();
        onRequestClose();
        handlePostModification();
        showAlert('You published a new post', 'success')
      }
    } catch (error) {
      console.log(error.toString());
      showAlert('An error occurred when trying to publish the post', 'error')
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <button className="closeBtn" onClick={onRequestClose}>
        Close
      </button>
      <form onSubmit={handleSubmit(submitCreatePost)} id="createPostForm">
        <div>
          <label htmlFor="title" hidden>
            Title
          </label>
          <input
            name="title"
            id="title"
            placeholder="title"
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && <p>Required</p>}
        </div>
        <div>
          <label htmlFor="media" hidden>
            Image
          </label>
          <input
            name="media"
            id="media"
            placeholder="Image URL"
            {...register("media")}
          />
          {errors.media && <p>{errors.media.message}</p>}
        </div>
        <div>
          <label htmlFor="body" hidden>
            Post content
          </label>
          <textarea
            name="body"
            id="body"
            placeholder="What's on your mind?"
            {...register("body")}
          />
          {errors.body && <p>{errors.body.message}</p>}
        </div>

        <button disabled={!isDirty}>Publish</button>
      </form>
    </Modal>
  );
}
