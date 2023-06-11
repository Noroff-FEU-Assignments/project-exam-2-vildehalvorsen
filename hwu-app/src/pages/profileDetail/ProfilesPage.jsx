import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, PROFILES_PATH } from "../../constants/api";
import { useAlert } from "../../hooks/useAlert";
import useRequireAuth from "../../hooks/useRequireAuth";

import Head from "../../components/layout/Head";
import Nav from "../../components/layout/Nav";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import AlertMessage from "../../components/common/AlertMessage";

import ProfileDetails from "../../components/profiles/ProfileDetails";
import DisplayPostList from "../../components/posts/DisplayPostsList";

import {
  BodyContainer,
  ProfileContentContainer,
} from "../../components/styledComponents/Containers";
import Footer from "../../components/layout/Footer";

export default function ProfilesPage() {
  const checkAuth = useRequireAuth();
  const navigate = useNavigate();

  // eslint-disable-next-line
  useEffect(() => {
    if (!checkAuth) {
      navigate("/");
    }
  }, [checkAuth, navigate]);

  const [auth] = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const { showMessage, message, type, showAlert } = useAlert();
  const { name } = useParams();

  const url = BASE_URL + PROFILES_PATH + `/${name}/posts`;

  const handlePostModification = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  if (!checkAuth) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Head title={name} />
      <Nav avatar={auth.avatar} />

      {showMessage && <AlertMessage type={type} message={message} />}

      <BodyContainer>
        <ProfileDetails name={name} showAlert={showAlert} />

        <ProfileContentContainer>
          <DisplayPostList
            key={refreshKey}
            url={url}
            handlePostModification={handlePostModification}
            showAlert={showAlert}
          />
        </ProfileContentContainer>

        <Footer />
      </BodyContainer>
    </>
  );
}
