import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

import { BASE_URL, PROFILES_PATH } from "../../constants/api";
import FollowButton from "../../components/profiles/follow/FollowButton";

import defaultBanner from "../../images/banner_default.jpg";
import defaultAvatar from "../../images/avatar_default.jpg";
import EditBanner from "./settings/EditBanner";
import EditAvatar from "./settings/EditAvatar";

import { Heading4, ProfileTitle } from "../styledComponents/Headings";
import { BannerBackground, ProfileBanner } from "../styledComponents/Banners";
import { MainAvatar, FollowerAvatar } from "../styledComponents/Avatars";
import {
  AvatarContainer,
  FlexContainer,
  FollowBtnContainer,
  FollowerContainer,
  FollowerListContainer,
} from "../styledComponents/Containers";
import LoadingIndicator from "../common/LoadingIndicator";
import { Paragraph } from "../styledComponents/Paragraph";

export default function ProfileDetails({ name, showAlert }) {
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
      const response = await axios.get(
        url + `?_followers=true&_following=true`,
        options
      );
      setDetails(response.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  function handleModifications() {
    getDetails();
  }

  if (loading) return <LoadingIndicator />;
  if (error) return <Paragraph align="center">An error occurred</Paragraph>;

  return (
    <div>
      <div>
        <BannerBackground>
          {name === auth.name && (
            <EditBanner
              name={name}
              details={details}
              handleModifications={handleModifications}
              showAlert={showAlert}
            />
          )}
          {details.banner ? (
            <ProfileBanner src={details.banner} alt="Profile banner" />
          ) : (
            <ProfileBanner src={defaultBanner} alt="Profile banner" />
          )}
        </BannerBackground>

        <FollowBtnContainer>
          <FollowButton name={name} handleModifications={handleModifications} />
        </FollowBtnContainer>
      </div>

      <AvatarContainer>
        {details.avatar ? (
          <MainAvatar src={details.avatar} alt="Profile avatar" />
        ) : (
          <MainAvatar src={defaultAvatar} alt="Profile avatar" />
        )}
        {name === auth.name && (
          <EditAvatar
            name={name}
            details={details}
            handleModifications={handleModifications}
            showAlert={showAlert}
          />
        )}
      </AvatarContainer>

      <ProfileTitle>{details.name}</ProfileTitle>

      <FlexContainer center>
        <FollowerContainer>
          <Heading4 align="center">
            Followers: {details._count.followers}
          </Heading4>

          <FollowerListContainer>
            {details.followers.slice(0, 30).map((follower) => {
              return (
                <Link
                  to={`/profiles/${follower.name}`}
                  title={follower.name}
                  key={follower.name}
                >
                  <FollowerAvatar
                    src={follower.avatar ? follower.avatar : defaultAvatar}
                  />
                </Link>
              );
            })}
          </FollowerListContainer>
        </FollowerContainer>

        <FollowerContainer>
          <Heading4 align="center">
            Following: {details._count.following}
          </Heading4>

          <FollowerListContainer>
            {details.following.slice(0, 30).map((follower) => {
              return (
                <Link
                  to={`/profiles/${follower.name}`}
                  title={follower.name}
                  key={follower.name}
                >
                  <FollowerAvatar
                    src={follower.avatar ? follower.avatar : defaultAvatar}
                  />
                </Link>
              );
            })}
          </FollowerListContainer>
        </FollowerContainer>
      </FlexContainer>
    </div>
  );
}
