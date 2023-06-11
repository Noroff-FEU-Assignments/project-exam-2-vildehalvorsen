import { useContext, useState, useEffect } from "react";
import { BASE_URL, PROFILES_PATH } from "../../../constants/api";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { FollowBtn } from "../../styledComponents/Buttons";
import HandleLogOut from "./HandleLogOut";

export default function DisplayActionsBtn({
  name,
  handleModifications,
  showAlert,
}) {
  const [auth] = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const accessToken = auth.accessToken;

  const url = BASE_URL + PROFILES_PATH + `/${name}`;
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  
  // eslint-disable-next-line
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
    }
  }

  async function handleFollow() {
    setLoading(true);
    try {
      await axios.put(url + "/follow", {}, options);
      setIsFollowing(true);
      handleModifications();
    } catch (error) {
      console.log(error);
      showAlert("An error occurred", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnfollow() {
    setLoading(true);
    try {
      await axios.put(url + "/unfollow", {}, options);
      setIsFollowing(false);
      handleModifications();
    } catch (error) {
      console.log(error);
      showAlert("An error occurred", "error");
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

  return (
    <>
      {name === auth.name ? (
        <HandleLogOut showAlert={showAlert} />
      ) : (
        <FollowBtn disabled={loading} onClick={handleClick}>
          {isFollowing ? "Unfollow" : "Follow"}
        </FollowBtn>
      )}
    </>
  );
}
