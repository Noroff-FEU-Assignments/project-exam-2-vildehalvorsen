import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, PROFILES_PATH } from "../../constants/api";
import { useAlert } from "../../hooks/useAlert";

import Head from "../../components/layout/Head";
import Nav from "../../components/layout/Nav";

import useRequireAuth from "../../hooks/useRequireAuth";
import ProfileDetails from "../../components/profiles/ProfileDetails";
import DisplayPostList from "../../components/posts/DisplayPostsList";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import AlertMessage from "../../components/common/AlertMessage";

import {
  BodyContainer,
  Container,
} from "../../components/styledComponents/Containers";

export default function ProfilesPage() {
  const checkAuth = useRequireAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuth) {
      navigate("/");
    }
  }, [checkAuth, navigate]);

  const [auth] = useContext(AuthContext);
  const { showMessage, message, type, showAlert } = useAlert();
  const { name } = useParams();

  const url = BASE_URL + PROFILES_PATH + `/${name}/posts`;

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

        <Container>
          <DisplayPostList url={url} />
        </Container>
      </BodyContainer>
    </>
  );
}