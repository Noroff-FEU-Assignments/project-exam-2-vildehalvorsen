import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";

export default function UpdateBannerModal({
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
      banner: details.banner,
    },
  });

  async function submitUpdateBanner(data) {
    setError(null);

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (!data.banner) {
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
      <form onSubmit={handleSubmit(submitUpdateBanner)} id="updateBannerForm">
        {error}
        <div>
          <label htmlFor="banner" hidden>
            Image URL
          </label>
          <input
            name="banner"
            id="banner"
            placeholder="Image URL"
            {...register("banner")}
          />
          {errors.banner && <p>Image URL must be publicly accessible</p>}
        </div>
        <button>Update banner</button>
        <button
          type="click"
          className="deleteBtn"
          onClick={handleSubmit(submitDeleteBanner)}
          disabled={details.banner ? false : true}
        >
          Delete
        </button>
      </form>
    </Modal>
  );
}
