import Head from "../../components/layout/Head";
import useRequireAuth from "../../hooks/useRequireAuth";
import ProfileDetails from "./functions/ProfileDetails";
import DisplayPostList from "../../components/posts/DisplayPostsList"
import { useParams } from "react-router-dom";
import { BASE_URL, PROFILES_PATH } from "../../constants/api";



export default function ProfilesPage() {
  useRequireAuth();
  const { name } = useParams();
const url = BASE_URL + PROFILES_PATH + `/${name}/posts`;

  return (
    <>
      <Head title={name} />

      <ProfileDetails name={name} />
      <DisplayPostList url={url}/>
    </>
  );
}
