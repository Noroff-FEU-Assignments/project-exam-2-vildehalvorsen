import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

import { BASE_URL, POSTS_PATH } from "../../../constants/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { DeleteBtn } from "../../styledComponents/Buttons";

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
        showAlert("Post deleted", "success");
      } catch (error) {
        console.log(error.toString());
        showAlert("An error occurred when trying to delete the post", "error");
      }
    }
  }
  return (
    <DeleteBtn onClick={handleDeletePost}>
      <FontAwesomeIcon icon={faTrashCan} title="Delete post" />
    </DeleteBtn>
  );
}
