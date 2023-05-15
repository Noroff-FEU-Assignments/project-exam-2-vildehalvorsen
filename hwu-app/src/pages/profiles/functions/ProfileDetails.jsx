import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../../constants/api";
import FollowButton from "./follow/FollowButton";

export default function ProfileDetails({ name }) {
  const [auth] = useContext(AuthContext);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = auth.accessToken;

  const url = BASE_URL + PROFILES_PATH + `/${name}`;

  useEffect(() => {
    getDetails();
  }, [accessToken, url]);

  async function getDetails() {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(url + `?_followers=true`, options);
      setDetails(response.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  function updateFollowersCount() {
    getDetails();
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <div>
        {details.banner && <img src={details.banner} alt="Profile banner" />}
      </div>

      <div>
        <FollowButton name={name} updateFollowersCount={updateFollowersCount} />
      </div>

      <div>
        <h1>{details.name}</h1>
        {details.avatar && <img src={details.avatar} alt="Profile avatar" />}
      </div>

      <div>
        <h3>Followers: {details._count.followers}</h3>
        <h3>Following: {details._count.following}</h3>
      </div>
    </div>
  );
}
