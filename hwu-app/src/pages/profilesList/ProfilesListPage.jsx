import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useAlert } from "../../hooks/useAlert";

import useRequireAuth from "../../hooks/useRequireAuth";
import Head from "../../components/layout/Head";
import Nav from "../../components/layout/Nav";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import AlertMessage from "../../components/common/AlertMessage";

import ProfilesList from "../../components/profiles/ProfilesList";

import { BannerBackground } from "../../components/styledComponents/Banners";
import { LogoBannerHeading } from "../../components/layout/LogoHeading";
import { BodyContainer } from "../../components/styledComponents/Containers";

export default function ProfilesListPage() {
  const checkAuth = useRequireAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuth) {
      navigate("/");
    }
  }, [checkAuth, navigate]);

  const [auth] = useContext(AuthContext);
  const { showMessage, message, type, showAlert } = useAlert();

  if (!checkAuth) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Head title="Profiles" />
      <Nav avatar={auth.avatar} />

      {showMessage && <AlertMessage type={type} message={message} />}

      <BodyContainer>
        <BannerBackground>
          <LogoBannerHeading line1="good" line2="vibes" line3="only" />
        </BannerBackground>

        <ProfilesList />
      </BodyContainer>
    </>
  );
}
