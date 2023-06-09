import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { BASE_URL, POSTS_PATH } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";
import { ButtonPrimary, ExitBtn } from "../../styledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  StyledForm,
  StyledInput,
  StyledTextarea,
} from "../../styledComponents/Forms";
import { Paragraph } from "../../styledComponents/Paragraph";
import { StyledModal } from "../../styledComponents/Modals";
import { Heading2 } from "../../styledComponents/Headings";
import { FlexContainer } from "../../styledComponents/Containers";

export default function CreatePostModal({
  isOpen,
  onRequestClose,
  handlePostModification,
  showAlert,
}) {
  const [auth] = useContext(AuthContext);
  const accessToken = auth.accessToken;
  const [error, setError] = useState(null);

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
    },
  });

  async function submitCreatePost(data) {
    const options = {
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
        showAlert("You published a new post", "success");
      }
    } catch (error) {
      console.log(error);
      showAlert(error.response.data.errors[0].message, "error");
    }
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="customOverlay"
    >
      <ExitBtn className="closeBtn" onClick={onRequestClose}>
        <FontAwesomeIcon icon={faXmark} />
      </ExitBtn>
        <StyledForm
          onSubmit={handleSubmit(submitCreatePost)}
          id="createPostForm"
        >
          <Heading2 align="center">Create a post</Heading2>
          <div>
            <label htmlFor="title" hidden>
              Title
            </label>
            <StyledInput
              name="title"
              id="title"
              placeholder="Title"
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
            <ButtonPrimary disabled={!isDirty}>Publish</ButtonPrimary>
          </FlexContainer>
        </StyledForm>
    </StyledModal>
  );
}
