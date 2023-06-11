import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../constants/api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "../common/LoadingIndicator";

import defaultAvatar from "../../images/avatar_default.jpg";
import { BrowseBtn } from "../styledComponents/Buttons";
import { ProfileListAvatar } from "../styledComponents/Avatars";
import { ProfilesBrowser } from "../styledComponents/Profiles";
import { Heading4 } from "../styledComponents/Headings";
import { Paragraph } from "../styledComponents/Paragraph";

export default function DisplayProfileBrowser() {
  const url = BASE_URL + PROFILES_PATH + `?sortOrder=asc`;

  const navigate = useNavigate();
  const [auth] = useContext(AuthContext);
  const [randomProfiles, setRandomProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = auth.accessToken;

  // eslint-disable-next-line
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

      while (randomIndices.length < 10) {
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

  return (
    <ProfilesBrowser>
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
                  <Link
                    to={
                      profile.name === auth.name
                        ? `/account`
                        : `/profiles/${profile.name}`
                    }
                    title={profile.name}
                  >
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
            <BrowseBtn onClick={() => navigate("/profilelist")}>
              Browse
            </BrowseBtn>
          </div>
        </>
      )}
    </ProfilesBrowser>
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
