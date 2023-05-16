import { useState } from "react";
import CreatePostModal from "../../modal/CreatePostModal";

export default function CreatePost({ handlePostModification }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button id="createPostBtn" onClick={handleOpenModal}>
        Create a post
      </button>
      {modalIsOpen && (
        <CreatePostModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          handlePostModification={handlePostModification}
        />
      )}
    </>
  );
}
