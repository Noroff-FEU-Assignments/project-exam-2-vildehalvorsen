import Head from "../../components/layout/Head";
import DisplayProfileList from "./functions/DisplayProfileList";
import DisplayPostsList from "../../components/posts/DisplayPostsList";
import useRequireAuth from "../../hooks/useRequireAuth";

import { BASE_URL, POSTS_PATH } from "../../constants/api";

export default function DashboardPage() {
  const auth = useRequireAuth();
  const url = BASE_URL + POSTS_PATH;

  if (!auth) {
    window.location.reload();
  }

  return (
    <>
      <Head title="Dashboard" />
      <h1>hi</h1>

      <DisplayProfileList />

      <div>
        <h2>Latest posts:</h2>
        <DisplayPostsList url={url} />
      </div>
    </>
  );
}
