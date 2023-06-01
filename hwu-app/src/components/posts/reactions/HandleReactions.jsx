import { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../../../context/AuthContext";
import { BASE_URL, POSTS_PATH } from "../../../constants/api";

import { PostReactionBtn } from "../../styledComponents/Buttons";
import { Paragraph } from "../../styledComponents/Paragraph";

export default function HandleReactions({
  postId,
  initialCount,
  setIsModified,
  isOpen,
}) {
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
          <Paragraph xsmall m5>
            {reactionCount} {reactionCount === 1 ? "like" : "likes"}
          </Paragraph>
        )}
        <PostReactionBtn borderNone={isOpen} onClick={handleLike}>👍</PostReactionBtn>
      </div>
    </>
  );
}
