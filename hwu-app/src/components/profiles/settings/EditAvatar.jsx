import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import UpdateAvatarModal from "../modals/UpdateAvatarModal";

export default function EditAvatar({ name, details, handleModifications }) {
  const [avatarModalIsOpen, setAvatarModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    if (!avatarModalIsOpen) {
      setAvatarModalIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    if (avatarModalIsOpen) {
      setAvatarModalIsOpen(false);
    }
  };

  return (
    <>
      <div>
        <button className="editMediaBtn" onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faCamera} />
        </button>
        {avatarModalIsOpen && (
          <UpdateAvatarModal
            name={name}
            details={details}
            isOpen={avatarModalIsOpen}
            onRequestClose={handleCloseModal}
            handleModifications={handleModifications}
          />
        )}
      </div>
    </>
  );
}
