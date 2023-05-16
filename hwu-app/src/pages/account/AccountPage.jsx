import { useState } from "react";
import useRequireAuth from "../../hooks/useRequireAuth";
import { BASE_URL, PROFILES_PATH } from "../../constants/api";

import Head from "../../components/layout/Head";
import ProfileDetails from "../profiles/functions/ProfileDetails";
import CreatePost from "../../components/posts/settings/CreatePost";

import DisplayPostsList from "../../components/posts/DisplayPostsList";

export default function AccountPage() {
  useRequireAuth();
  const auth = localStorage.getItem("auth");
  const user = JSON.parse(auth);

  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostModification = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Head title={"Hi " + user.name} />

      <ProfileDetails name={user.name} />

      <CreatePost handlePostModification={handlePostModification} />

      <DisplayPostsList
        key={refreshKey}
        url={BASE_URL + PROFILES_PATH + `/${user.name}/posts`}
        handlePostModification={handlePostModification}
      />
    </>
  );
}
