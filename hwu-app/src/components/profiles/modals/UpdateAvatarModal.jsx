import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";

export default function UpdateAvatarModal({
  name,
  details,
  isOpen,
  onRequestClose,
  handleModifications,
}) {
  const [auth] = useContext(AuthContext);
  const accessToken = auth.accessToken;
  const [error, setError] = useState(null);

  const url = BASE_URL + PROFILES_PATH + `/${name}/media`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: details.avatar,
    },
  });

  async function submitUpdateAvatar(data) {
    setError(null);

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (!data.avatar) {
      setError("Please enter an image URL before updating");
    } else {
      try {
        const response = await axios.put(url, data, options);
        if (response.status === 200) {
          handleModifications();
        }
      } catch (error) {
        console.log(error.toString());
        setError(error.toString());
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
          handleModifications();
          reset();
          onRequestClose();
        }
      } catch (error) {
        console.log(error);
        setError(error.toString());
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <button className="closeBtn" onClick={onRequestClose}>
        Close
      </button>
      <form onSubmit={handleSubmit(submitUpdateAvatar)} id="updateAvatarForm">
        {error}
        <div>
          <label htmlFor="avatar" hidden>
            Image URL
          </label>
          <input
            name="avatar"
            id="avatar"
            placeholder="Image URL"
            {...register("avatar")}
          />
          {errors.avatar && <p>Image URL must be publicly accessible</p>}
        </div>
        <button>Update avatar</button>
        <button
          type="click"
          className="deleteBtn"
          onClick={handleSubmit(submitDeleteAvatar)}
          disabled={details.avatar ? false : true}
        >
          Delete
        </button>
      </form>
    </Modal>
  );
}