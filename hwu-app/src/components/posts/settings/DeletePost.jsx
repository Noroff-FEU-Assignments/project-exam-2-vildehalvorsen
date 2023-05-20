import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

import { BASE_URL, POSTS_PATH } from "../../../constants/api";

export default function DeletePost({
  postData,
  handlePostModification,
  showAlert,
}) {
  const [auth] = useContext(AuthContext);
  const accessToken = auth.accessToken;

  const url = BASE_URL + POSTS_PATH + `/${postData.id}`;

  async function handleDeletePost() {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(url, options);
        handlePostModification();
        showAlert("You deleted a post", "success");
      } catch (error) {
        console.log(error.toString());
        showAlert("An error occurred whent rying to delete the post", "error");
      }
    }
  }
  return (
    <button className="deleteBtn" onClick={handleDeletePost}>
      Delete
    </button>
  );
}
