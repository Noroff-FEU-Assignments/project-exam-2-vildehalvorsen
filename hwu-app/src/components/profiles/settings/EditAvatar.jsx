import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import UpdateAvatarModal from "../modals/UpdateAvatarModal";
import { EditImageBtn } from "../../styledComponents/Buttons";

export default function EditAvatar({ name, details, handleModifications, showAlert }) {
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
        <EditImageBtn onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faCamera} title="Edit Avatar" />
        </EditImageBtn>
        {avatarModalIsOpen && (
          <UpdateAvatarModal
            name={name}
            details={details}
            isOpen={avatarModalIsOpen}
            onRequestClose={handleCloseModal}
            handleModifications={handleModifications}
            showAlert={showAlert}
          />
        )}
      </div>
    </>
  );
}
