import axios from "axios";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import PostsListHtml from "./PostsListHtml";

export default function DisplayPostsList({ url }) {
  const [auth] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = auth.accessToken;

  useEffect(() => {
    getPostsData();
  }, [accessToken, url, page]);

  async function getPostsData() {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(
        url +
          `?page=${page}&limit=${limit}&_author=true&_comments=true&_reactions=true`,
        options
      );
      setPosts(response.data);
      window.addEventListener("scroll", handleScroll);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }
  const latestPosts = [...posts].sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMore();
    }
  }

  function loadMore() {
    if (limit >= 30) {
      return;
    }
    setLimit(limit + 10);
    setPage(page + 1);
  }

  const handleOpenModal = (id) => {
    if (!postModalIsOpen) {
      setPostModalIsOpen(true);
      setSelectedPost(id);
    }
  };

  const handleCloseModal = () => {
    if (postModalIsOpen) {
      setPostModalIsOpen(false);
      setSelectedPost(null);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;
  if (latestPosts.length === 0) return <div>The user hasn't published any posts yet</div>;

  return (
    <PostsListHtml
      posts={latestPosts || []}
      limit={limit}
      selectedPost={selectedPost}
      accessToken={accessToken}
      postModalIsOpen={postModalIsOpen}
      handleCloseModal={handleCloseModal}
      handleOpenModal={handleOpenModal}
    />
  );
}
