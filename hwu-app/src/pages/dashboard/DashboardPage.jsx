import { useState } from "react";

import Head from "../../components/layout/Head";
import DisplayProfileList from "./functions/DisplayProfileList";
import DisplayPostsList from "../../components/posts/DisplayPostsList";
import useRequireAuth from "../../hooks/useRequireAuth";
import {useAlert} from "../../hooks/useAlert"

import { BASE_URL, POSTS_PATH } from "../../constants/api";

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
    
      <h1>hi</h1>
      
      {showMessage && (
        <div className={type}>
          <p>{message}</p>
        </div>
      )}

      <DisplayProfileList />
      <div>
        <h2>Latest posts:</h2>
        <DisplayPostsList
          key={refreshKey}
          url={url}
          handlePostModification={handlePostModification}
          showAlert={showAlert}
        />
      </div>
    </>
  );
}
