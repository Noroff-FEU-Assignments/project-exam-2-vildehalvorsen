import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../constants/api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import ProfilesListModal from "./modals/ProfilesListModal";

import defaultAvatar from "../../images/avatar_default.jpg";
import { BrowseBtn } from "../styledComponents/Buttons";
import { ProfileListAvatar } from "../styledComponents/Avatars";

import { ProfilesListContainer } from "../styledComponents/Profiles";
import { Heading4 } from "../styledComponents/Headings";
import LoadingIndicator from "../common/LoadingIndicator";
import { Paragraph } from "../styledComponents/Paragraph";

export default function DisplayProfileList() {
  const url = BASE_URL + PROFILES_PATH;

  const [auth] = useContext(AuthContext);
  const [randomProfiles, setRandomProfiles] = useState([]);
  const [profilesModalIsOpen, setProfilesModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = auth.accessToken;

  useEffect(() => {
    getProfilesData();
  }, [accessToken, url]);

  async function getProfilesData() {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(url, options);
      const data = response.data;
      const randomIndices = [];

      while (randomIndices.length < 5) {
        const randomIndex = Math.floor(Math.random() * data.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }
      const randomProfiles = randomIndices.map((index) => data[index]);
      setRandomProfiles(randomProfiles);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = () => {
    setProfilesModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setProfilesModalIsOpen(false);
  };

  return (
    <ProfilesListContainer>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Paragraph align="center">An error occurred</Paragraph>
      ) : (
        <>
          <ul>
            {randomProfiles.map((profile) => {
              return (
                <li key={profile.email}>
                  <Link to={`/profiles/${profile.name}`} title={profile.name}>
                    <ProfileListAvatar
                      src={profile.avatar ? profile.avatar : defaultAvatar}
                      alt="Profile avatar"
                    />
                    <Heading4>{profile.name}</Heading4>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div>
            <BrowseBtn onClick={handleOpenModal}>Browse </BrowseBtn>
            <ProfilesListModal
              isOpen={profilesModalIsOpen}
              onRequestClose={handleCloseModal}
            />
          </div>
        </>
      )}
    </ProfilesListContainer>
  );
}

// {
  /* <input
        value={search}
        onChange={handleSearch}
        placeholder="Search profiles"
      /> */
// }

// function handleSearch(e) {
//   const searchValue = e.target.value;
//   setSearch(searchValue);
//   const filteredList = allProfiles.filter((profile) =>
//     profile.name
//       .toLowerCase()
//       .includes(e.target.value.replace(/\s+/g, "_").toLowerCase())
//   );
//   setDisplayedProfiles(filteredList.slice(0, 10));
// }
