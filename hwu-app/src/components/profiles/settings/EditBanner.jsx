import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import UpdateBannerModal from "../modals/UpdateBannerModal";

export default function EditBanner({ name, details, handleModifications }) {
  const [bannerModalIsOpen, setBannerModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    if (!bannerModalIsOpen) {
      setBannerModalIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    if (bannerModalIsOpen) {
      setBannerModalIsOpen(false);
    }
  };

  return (
    <>
      <div>
        <button className="editMediaBtn" onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faCamera} />
        </button>
        {bannerModalIsOpen && (
          <UpdateBannerModal
            name={name}
            details={details}
            isOpen={bannerModalIsOpen}
            onRequestClose={handleCloseModal}
            handleModifications={handleModifications}
          />
        )}
      </div>
    </>
  );
}
