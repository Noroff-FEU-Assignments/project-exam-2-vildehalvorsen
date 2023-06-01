import { useState } from "react";
import CreatePostModal from "../modals/CreatePostModal";

import { CreatePostBtn } from "../../styledComponents/Buttons";

export default function CreatePost({ handlePostModification, showAlert }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <CreatePostBtn 
      onClick={handleOpenModal}>
        Create a post...
      </CreatePostBtn>
      {modalIsOpen && (
        <CreatePostModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          handlePostModification={handlePostModification}
          showAlert={showAlert}
        />
      )}
    </>
  );
}
