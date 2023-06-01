import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import UpdateBannerModal from "../modals/UpdateBannerModal";

import { EditImageBtn } from "../../styledComponents/Buttons";
import { EditBannerBtnContainer } from "../../styledComponents/Containers";

export default function EditBanner({ name, details, handleModifications, showAlert }) {
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
      <EditBannerBtnContainer>
        <EditImageBtn onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faCamera} title="Edit Banner"/>
        </EditImageBtn>
        {bannerModalIsOpen && (
          <UpdateBannerModal
            name={name}
            details={details}
            isOpen={bannerModalIsOpen}
            onRequestClose={handleCloseModal}
            handleModifications={handleModifications}
            showAlert={showAlert}
          />
        )}
      </EditBannerBtnContainer>
    </>
  );
}
