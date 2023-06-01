import { useContext, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";

import { BASE_URL, POSTS_PATH } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";
import { StyledModal } from "../../styledComponents/Modals";
import { ButtonPrimary, ExitBtn } from "../../styledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  StyledForm,
  StyledInput,
  StyledTextarea,
} from "../../styledComponents/Forms";
import { Paragraph } from "../../styledComponents/Paragraph";
import { FlexContainer } from "../../styledComponents/Containers";
import { Heading2 } from "../../styledComponents/Headings";

export default function UpdatePostModal({
  postData,
  isOpen,
  onRequestClose,
  handlePostModification,
  showAlert,
}) {
  const [auth] = useContext(AuthContext);
  const accessToken = auth.accessToken;

  const url = BASE_URL + POSTS_PATH + `/${postData.id}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: postData.title,
      media: postData.media,
      body: postData.body,
    },
  });

  async function submitUpdatePost(data) {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.put(url, data, options);
      if (response.status === 200) {
        handlePostModification();
        showAlert("Post updated successfully", "success");
      }
    } catch (error) {
      console.log(error.toString());
      showAlert(error.response.data.errors[0].message, "error");
    }
  }

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName={"customOverlay"}>
      <ExitBtn className="closeBtn" onClick={onRequestClose}>
        <FontAwesomeIcon icon={faXmark} />
      </ExitBtn>
      <StyledForm onSubmit={handleSubmit(submitUpdatePost)} id="updatePostForm">
        <Heading2 align="center">Update post</Heading2>
        <div>
          <label htmlFor="title" hidden>
            Title
          </label>
          <StyledInput
            name="title"
            id="title"
            placeholder="title"
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && <Paragraph>Required</Paragraph>}
        </div>
        <div>
          <label htmlFor="media" hidden>
            Image
          </label>
          <StyledInput
            name="media"
            id="media"
            placeholder="Image URL"
            {...register("media")}
          />
        </div>
        <div>
          <label htmlFor="body" hidden>
            Post content
          </label>
          <StyledTextarea
            name="body"
            id="body"
            placeholder="What's on your mind?"
            {...register("body")}
          />
        </div>
        <FlexContainer center>
          <ButtonPrimary disabled={!isDirty}>Save changes</ButtonPrimary>
        </FlexContainer>
      </StyledForm>
    </StyledModal>
  );
}
