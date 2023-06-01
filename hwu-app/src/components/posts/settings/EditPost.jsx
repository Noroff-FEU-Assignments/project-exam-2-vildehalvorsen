import React, { useState } from "react";
import UpdatePostModal from "../modals/UpdatePostModal";
import DeletePost from "./DeletePost";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { EditBtn } from "../../styledComponents/Buttons";

export default function EditPost({
  postData,
  handlePostModification,
  showAlert,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div>
        <EditBtn onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faPenToSquare} title="Edit post" />
        </EditBtn>
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
      </div>
    </>
  );
}
