import { useContext, useState, useEffect } from "react";
import { BASE_URL, PROFILES_PATH } from "../../../../constants/api";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext";

export default function FollowButton({ name, updateFollowersCount }) {
  const [auth] = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = auth.accessToken;

  const url = BASE_URL + PROFILES_PATH + `/${name}`;
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    checkFollowing();
  }, [accessToken, url]);

  async function checkFollowing() {
    try {
      const response = await axios.get(url + "?_followers=true", options);
      const followers = response.data.followers;
      const isUserFollowing = followers.some(
        (follower) => follower.name === auth.name
      );
      setIsFollowing(isUserFollowing);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    }
  }

  async function handleFollow() {
    setLoading(true);
    try {
      await axios.put(url + "/follow", {}, options);
      setIsFollowing(true);
      updateFollowersCount();
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  async function handleUnfollow() {
    setLoading(true);
    try {
      await axios.put(url + "/unfollow", {}, options);
      setIsFollowing(false);
      updateFollowersCount();
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  function handleClick() {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  if (error) return <div>An error occurred</div>;

  return (
    <>
      {name === auth.name ? null : (
        <button disabled={loading} onClick={handleClick}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </>
  );
}
