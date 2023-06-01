import { useState } from "react";

import Head from "../../components/layout/Head";
import DisplayProfileList from "../../components/profiles/DisplayProfileList";
import DisplayPostsList from "../../components/posts/DisplayPostsList";
import useRequireAuth from "../../hooks/useRequireAuth";
import { useAlert } from "../../hooks/useAlert";

import { BASE_URL, POSTS_PATH } from "../../constants/api";
import { LogoBannerHeading } from "../../components/layout/LogoHeading";
import { BannerBackground } from "../../components/styledComponents/Banners";
import AlertMessage from "../../components/common/AlertMessage";

export default function DashboardPage() {
  const auth = useRequireAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const { showMessage, message, type, showAlert } = useAlert();

  const url = BASE_URL + POSTS_PATH;

  if (!auth) {
    window.location.reload();
  }

  const handlePostModification = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Head title="Dashboard" />
      <BannerBackground>
        <LogoBannerHeading line1="make" line2="people" line3="grin" />
      </BannerBackground>

      {showMessage && (
        <AlertMessage type={type} message={message}/>
      )}
      
      <DisplayProfileList />

      <DisplayPostsList
        key={refreshKey}
        url={url}
        handlePostModification={handlePostModification}
        showAlert={showAlert}
      />
    </>
  );
}
