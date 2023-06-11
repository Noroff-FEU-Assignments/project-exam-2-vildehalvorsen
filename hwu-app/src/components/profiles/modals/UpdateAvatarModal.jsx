import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";
import { StyledModal } from "../../styledComponents/Modals";
import {
  ButtonPrimary,
  ButtonSecondary,
  ExitBtn,
  ExitBtnContainer,
} from "../../styledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { StyledForm, StyledInput } from "../../styledComponents/Forms";
import { Heading2 } from "../../styledComponents/Headings";
import { Paragraph } from "../../styledComponents/Paragraph";
import { FlexContainer } from "../../styledComponents/Containers";

export default function UpdateAvatarModal({
  name,
  details,
  isOpen,
  onRequestClose,
  handleModifications,
  showAlert,
}) {
  const [auth, setAuth] = useContext(AuthContext);
  const accessToken = auth.accessToken;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = BASE_URL + PROFILES_PATH + `/${name}/media`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      avatar: details.avatar,
    },
  });

  async function submitUpdateAvatar(data) {
    setError(null);
    setLoading(true);

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (!data.avatar) {
      showAlert("Please enter an image URL before updating", "warning");
      setLoading(false);
    } else {
      try {
        const response = await axios.put(url, data, options);
        if (response.status === 200) {
          setAuth({
            ...auth,
            avatar: data.avatar,
          });
          handleModifications();
          showAlert("Avatar updated", "success");
          setTimeout(() => {
            onRequestClose();
          }, 200);
        }
      } catch (error) {
        console.log(error.toString());
        showAlert("Image URL is not valid or publicly accessible", "error");
      } finally {
        setLoading(false);
      }
    }
  }

  async function submitDeleteAvatar() {
    setError(null);

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this beautiful image?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.put(
          url,
          {
            avatar: null,
          },
          options
        );
        if (response.status === 200) {
          setAuth({
            ...auth,
            avatar: null,
          });
          
          handleModifications();
          reset();
          showAlert("Avatar deleted", "success");
          setTimeout(() => {
            onRequestClose();
          }, 200);
        }
      } catch (error) {
        console.log(error.toString());
        showAlert("Something went wrong trying to delete the avatar", "error");
      }
    }
  }

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName={"customOverlay"}>
      <ExitBtnContainer>
      <ExitBtn className="closeBtn" onClick={onRequestClose}>
        <FontAwesomeIcon icon={faXmark} />
      </ExitBtn>
      </ExitBtnContainer>
      <StyledForm
        onSubmit={handleSubmit(submitUpdateAvatar)}
        id="updateAvatarForm"
      >
        <Heading2 align="center">Update avatar</Heading2>
        <div>
          <label htmlFor="avatar" hidden>
            Image URL
          </label>
          <StyledInput
            name="avatar"
            id="avatar"
            placeholder="Image URL"
            {...register("avatar")}
          />
          {error && (
            <Paragraph align="center">
              Image URL must be publicly accessible
            </Paragraph>
          )}
        </div>

        <FlexContainer center>
          <ButtonPrimary disabled={!isDirty || loading}>
            {loading ? "Updating..." : "Update"}
          </ButtonPrimary>
        </FlexContainer>
        <FlexContainer center>
          <ButtonSecondary
            type="click"
            className="deleteBtn"
            onClick={handleSubmit(submitDeleteAvatar)}
            disabled={details.avatar ? false : true}
          >
            Delete
          </ButtonSecondary>
        </FlexContainer>
      </StyledForm>
    </StyledModal>
  );
}
