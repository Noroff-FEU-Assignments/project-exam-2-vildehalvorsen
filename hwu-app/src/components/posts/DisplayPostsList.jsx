import axios from "axios";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import PostsListHtml from "./PostsListHtml";
import { SectionContainer } from "../styledComponents/Containers";
import LoadingIndicator from "../common/LoadingIndicator";
import { Paragraph } from "../styledComponents/Paragraph";

export default function DisplayPostsList({
  url,
  handlePostModification,
  showAlert,
}) {
  const [auth] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = auth.accessToken;
  const [isModified, setIsModified] = useState(false);

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
    if (limit >= 20) {
      return;
    }
    setLimit(limit + 5);
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
      if (isModified) {
        handlePostModification();
      }
    }
  };

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <SectionContainer>
          <Paragraph align="center">An error occurred</Paragraph>
        </SectionContainer>
      ) : (
        <PostsListHtml
          posts={latestPosts || []}
          limit={limit}
          selectedPost={selectedPost}
          accessToken={accessToken}
          postModalIsOpen={postModalIsOpen}
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
          handlePostModification={handlePostModification}
          setIsModified={setIsModified}
          showAlert={showAlert}
        />
      )}
    </>
  );
}
