import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Modal from "react-modal";
import axios from "axios";

import { BASE_URL, POSTS_PATH } from "../../constants/api";
import CommentForm from "../posts/comments/CommentForm";

export default function PostsModal({
  isOpen,
  onRequestClose,
  post,
  accessToken,
}) {
  const url =
    BASE_URL +
    POSTS_PATH +
    `/${post}?_author=true&_comments=true&_reactions=true`;
  
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [, setIsCommenting] = useState(false);

  useEffect(() => {
    fetchPostData();
  }, [accessToken, url]);

  async function fetchPostData() {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(url, options);
      setPostData(response.data);
      // console.log(response.data.reactions);
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }
  
  const handleCommentAdded = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <button onClick={onRequestClose}>Close</button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div>
            <p>{postData.author.name}</p>
            <p>
              {new Date(postData.created).toLocaleString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <h3>{postData.title}</h3>
            {postData.media && <img src={postData.media} alt="Post media" />}
            <p>{postData.body}</p>
          </div>
          <div>
            {postData._count.reactions === 0 ? null : (
              <p>{postData._count.reactions} reactions</p>
            )}
            {postData._count.comments === 0 ? null : (
              <p>{postData._count.comments} comments</p>
            )}
          </div>
          <div>
            <button>react</button>
            <button onClick={() => {
              setIsCommenting(true);
            }}>comment</button>
          </div>
          <div>
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <img src={comment.author.avatar} alt="profile avatar" />
                  <p>{comment.author.name}</p>
                  <p>{comment.body}</p>
                </li>
              );
            })}
            <CommentForm 
            accessToken={accessToken}
            postId={postData.id}
            onCommentAdded={handleCommentAdded}
            imageSrc={auth.avatar}
            autoFocus={true}
            />
          </div>
        </>
      )}
    </Modal>
  );
}
