import React, { useState } from "react";
import UpdatePostModal from "../../modal/UpdatePostModal";
import DeletePost from "./DeletePost";

export default function EditPost({ postData, handlePostModification, showAlert }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button className="editBtn" onClick={handleOpenModal}>
        Edit Post
      </button>
      {modalIsOpen && (
        <UpdatePostModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          postData={postData}
          handlePostModification={handlePostModification}
          showAlert={showAlert}
        />
      )}
      <DeletePost
        postData={postData}
        handlePostModification={handlePostModification}
        showAlert={showAlert}
      />
    </>
  );
}
