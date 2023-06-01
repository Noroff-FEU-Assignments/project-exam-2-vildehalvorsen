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
} from "../../styledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { StyledForm, StyledInput } from "../../styledComponents/Forms";
import { Heading2 } from "../../styledComponents/Headings";
import { Paragraph } from "../../styledComponents/Paragraph";
import { FlexContainer } from "../../styledComponents/Containers";

export default function UpdateBannerModal({
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
      banner: details.banner,
    },
  });

  async function submitUpdateBanner(data) {
    setError(null);
    setLoading(true);

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (!data.banner) {
      showAlert("Please enter an image URL before updating", "warning");
      setLoading(false);
    } else {
      try {
        const response = await axios.put(url, data, options);
        if (response.status === 200) {
          setAuth({
            ...auth,
            banner: data.banner,
          });

          handleModifications();
          showAlert("Banner updated", "success");
        }
      } catch (error) {
        console.log(error.toString());
        showAlert("Image URL is not valid or publicly accessible", "error");
      } finally {
        setLoading(false);
      }
    }
  }

  async function submitDeleteBanner() {
    setError(null);

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this amazing banner?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.put(
          url,
          {
            banner: null,
          },
          options
        );
        if (response.status === 200) {
          setAuth({
            ...auth,
            banner: null,
          });

          handleModifications();
          reset();
          onRequestClose();
          showAlert("Banner deleted", "success");
        }
      } catch (error) {
        console.log(error);
        showAlert("Something went wrong trying to delete the banner", "error");
      }
    }
  }

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName={"customOverlay"}>
      <ExitBtn className="closeBtn" onClick={onRequestClose}>
        <FontAwesomeIcon icon={faXmark} />
      </ExitBtn>
      <StyledForm
        onSubmit={handleSubmit(submitUpdateBanner)}
        id="updateBannerForm"
      >
        <Heading2 align="center">Update banner</Heading2>
        <div>
          <label htmlFor="banner" hidden>
            Image URL
          </label>
          <StyledInput
            name="banner"
            id="banner"
            placeholder="Image URL"
            {...register("banner")}
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
            onClick={handleSubmit(submitDeleteBanner)}
            disabled={details.banner ? false : true}
          >
            Delete
          </ButtonSecondary>
        </FlexContainer>
      </StyledForm>
    </StyledModal>
  );
}
