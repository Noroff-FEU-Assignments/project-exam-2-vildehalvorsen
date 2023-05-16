import { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../../../context/AuthContext";
import { BASE_URL, POSTS_PATH } from "../../../constants/api";

export default function HandleReactions({ postId, initialCount, setIsModified }) {
  const [auth] = useContext(AuthContext);
  const accessToken = auth.accessToken;

  const [reactionCount, setReactionCount] = useState(initialCount);

  const url = `${BASE_URL + POSTS_PATH}/${postId}`;

  async function handleLike() {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const symbol = "👍";

    try {
      await axios.put(`${url}/react/${symbol}`, {}, options);
      setReactionCount(reactionCount + 1);
      setIsModified(true);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <div>
        {reactionCount === 0 ? null : (
        <p>Reactions: {reactionCount}</p>
        )}
        <button onClick={handleLike}>👍</button>
      </div>
    </>
  );
}
