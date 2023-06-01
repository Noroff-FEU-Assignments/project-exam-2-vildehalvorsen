import { useState } from "react";
import useRequireAuth from "../../hooks/useRequireAuth";
import { BASE_URL, PROFILES_PATH } from "../../constants/api";

import Head from "../../components/layout/Head";
import ProfileDetails from "../../components/profiles/ProfileDetails";
import CreatePost from "../../components/posts/settings/CreatePost";

import DisplayPostsList from "../../components/posts/DisplayPostsList";
import { useAlert } from "../../hooks/useAlert";

import { Container } from "../../components/styledComponents/Containers";
import AlertMessage from "../../components/common/AlertMessage";

export default function AccountPage() {
  useRequireAuth();
  const auth = localStorage.getItem("auth");
  const user = JSON.parse(auth);

  const [refreshKey, setRefreshKey] = useState(0);
  const { showMessage, message, type, showAlert } = useAlert();

  const handlePostModification = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Head title={"Hi " + user.name} />

      {showMessage && (
        <AlertMessage type={type} message={message}/>
      )}

      <ProfileDetails name={user.name} showAlert={showAlert} />

      <Container>
        <CreatePost
          handlePostModification={handlePostModification}
          showAlert={showAlert}
        />

        <DisplayPostsList
          key={refreshKey}
          url={BASE_URL + PROFILES_PATH + `/${user.name}/posts`}
          handlePostModification={handlePostModification}
          showAlert={showAlert}
        />
      </Container>
    </>
  );
}
