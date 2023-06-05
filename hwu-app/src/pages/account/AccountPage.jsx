import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useRequireAuth from "../../hooks/useRequireAuth";
import { BASE_URL, PROFILES_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

import Nav from "../../components/layout/Nav";
import Head from "../../components/layout/Head";
import ProfileDetails from "../../components/profiles/ProfileDetails";
import CreatePost from "../../components/posts/settings/CreatePost";

import DisplayPostsList from "../../components/posts/DisplayPostsList";
import { useAlert } from "../../hooks/useAlert";

import { BodyContainer, Container } from "../../components/styledComponents/Containers";
import AlertMessage from "../../components/common/AlertMessage";
import LoadingIndicator from "../../components/common/LoadingIndicator";


export default function AccountPage() {
  const checkAuth = useRequireAuth();
  const navigate = useNavigate();
  
  if (!checkAuth) {
    navigate("/");
  }

  const [auth] = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const { showMessage, message, type, showAlert } = useAlert();

  const handlePostModification = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  if(!checkAuth) {
    return <LoadingIndicator />
  }
  
  return (
    <>
      <Head title={"Hi " + auth.name} />
      <Nav avatar={auth.avatar}/>

      {showMessage && (
        <AlertMessage type={type} message={message}/>
      )}
      
      <BodyContainer>
      <ProfileDetails name={auth.name} showAlert={showAlert} />

      <Container>
        <CreatePost
          handlePostModification={handlePostModification}
          showAlert={showAlert}
        />

        <DisplayPostsList
          key={refreshKey}
          url={BASE_URL + PROFILES_PATH + `/${auth.name}/posts`}
          handlePostModification={handlePostModification}
          showAlert={showAlert}
        />
      </Container>
      </BodyContainer>
    </>
  );
}
