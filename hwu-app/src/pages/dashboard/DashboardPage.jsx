import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Head from "../../components/layout/Head";
import Nav from "../../components/layout/Nav";
import DisplayProfileBrowser from "../../components/profiles/DisplayProfileBrowser";
import DisplayPostsList from "../../components/posts/DisplayPostsList";
import useRequireAuth from "../../hooks/useRequireAuth";
import { useAlert } from "../../hooks/useAlert";

import { BASE_URL, POSTS_PATH } from "../../constants/api";
import { LogoBannerHeading } from "../../components/layout/LogoHeading";
import { BannerBackground } from "../../components/styledComponents/Banners";
import AlertMessage from "../../components/common/AlertMessage";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import {
  BodyContainer,
  FlexContainer,
} from "../../components/styledComponents/Containers";
import CreatePost from "../../components/posts/settings/CreatePost";
import Footer from "../../components/layout/Footer";

export default function DashboardPage() {
  const checkAuth = useRequireAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuth) {
      navigate("/");
    }
  }, [checkAuth, navigate]);

  const [auth] = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const { showMessage, message, type, showAlert } = useAlert();

  const url = BASE_URL + POSTS_PATH;

  const handlePostModification = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  if (!checkAuth) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Head title="Dashboard" />

      <Nav avatar={auth.avatar} />

      {showMessage && <AlertMessage type={type} message={message} />}

      <BodyContainer>
        <BannerBackground>
          <LogoBannerHeading line1="make" line2="people" line3="grin" />
        </BannerBackground>

        <DisplayProfileBrowser />

        {auth && (
          <FlexContainer center>
            <CreatePost
              handlePostModification={handlePostModification}
              showAlert={showAlert}
            />
          </FlexContainer>
        )}

        <DisplayPostsList
          key={refreshKey}
          url={url}
          handlePostModification={handlePostModification}
          showAlert={showAlert}
        />

        <Footer />
      </BodyContainer>
    </>
  );
}
