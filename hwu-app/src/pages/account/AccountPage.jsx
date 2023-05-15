import Head from "../../components/layout/Head";
import useRequireAuth from "../../hooks/useRequireAuth";
import ProfileDetails from "../profiles/functions/ProfileDetails";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL, POSTS_PATH } from "../../constants/api";

export default function AccountPage() {
  useRequireAuth();
  const auth = localStorage.getItem("auth");
  const user = JSON.parse(auth);

  return (
    <>
      <Head title={"Hi " + user.name} />

      <ProfileDetails name={user.name} />

      <HandleReactions />
    </>
  );
}

function HandleReactions() {
  const [auth] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = auth.accessToken;

  const url = BASE_URL + POSTS_PATH;

  useEffect(() => {
    getPostsData();
  }, [accessToken, url]);

  async function getPostsData() {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(url, options);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }
  
  async function handleLike(postId) {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    
    const symbol = "👍";
    
    try {
      await axios.put(`${url}/${postId}/react/${symbol}`, {}, options);
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            return {...post, _count: {...post._count, reactions: post._count.reactions + 1}}
          } else {
            return post;
          }
        });
      });
    } catch (error) {
      console.log(error);
      setError(error.toString());
    }
  }

  return (
    <>
      {posts.slice(0, 10).map((post) => {
        const { id, _count } = post;
        return (
          <div key={id}>
            <p>Reactions: {_count.reactions}</p>
            <button onClick={() => handleLike(id)}>👍</button>
          </div>
        );
      })}
    </>
  );
}
