import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

import { BASE_URL, POSTS_PATH } from "../../../constants/api";

export default function DeletePost({ postData, handlePostModification }) {
  const [auth] = useContext(AuthContext);
  const accessToken = auth.accessToken;
  const [, setError] = useState(null);

  const url = BASE_URL + POSTS_PATH + `/${postData.id}`;

 
    async function handleDeletePost() {
    setError(null);
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
      } catch (error) {
        console.log(error.toString());
        setError(error.toString());
      }
    }
  }
  return (
    <button className="deleteBtn" onClick={handleDeletePost}>
      Delete
    </button>
  );
}
