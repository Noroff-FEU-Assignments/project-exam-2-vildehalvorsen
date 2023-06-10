import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../constants/api";

import defaultAvatar from "../../images/avatar_default.jpg";
import LoadingIndicator from "../common/LoadingIndicator";
import { Heading4 } from "../styledComponents/Headings";
import { Paragraph } from "../styledComponents/Paragraph";
import { ProfileListAvatar } from "../styledComponents/Avatars";
import { ProfilesListContainer } from "../styledComponents/Profiles";
import { StyledInput } from "../styledComponents/Forms";

export default function ProfilesList() {
  const [allProfiles, setAllProfiles] = useState([]);
  const [displayedProfiles, setDisplayedProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = BASE_URL + PROFILES_PATH + `?sortOrder=asc&limit=${100}`;
  
  const limit = 15;
  const totalProfiles = 500;

  const [auth] = useContext(AuthContext);
  const accessToken = auth.accessToken;

  // eslint-disable-next-line
  useEffect(() => {
    fetchData();
  }, [accessToken, url]);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const profiles = [];
      let offset = 100;

      while (offset < totalProfiles) {
        const response = await axios.get(
          `${url}&offset=${offset}`,
          options
        );
        profiles.push(...response.data);
        offset += 100;
      }

      setAllProfiles(profiles);
      setDisplayedProfiles(profiles.slice(0, limit));
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }
  
  function handleSearch(e) {
    const searchValue = e.target.value.trim();
    setSearch(searchValue);
    const filteredList = allProfiles.filter((profile) =>
      profile.name
        .toLowerCase()
        .includes(searchValue.replace(/\s+/g, "_").toLowerCase())
    );
    setDisplayedProfiles(filteredList.slice(0, limit));
  }

  return (
    <>
      <ProfilesListContainer>
        <StyledInput
          id="searchInput"
          value={search}
          onChange={handleSearch}
          placeholder="Search profiles"
        />
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <Paragraph align="center">{error}</Paragraph>
        ) : (
          <>
            <ul>
              {displayedProfiles.length === 0 ? (
                <Paragraph>No profiles matches your search</Paragraph>
              ) : (
                displayedProfiles.map((profile) => {
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
                })
              )}
            </ul>
          </>
        )}
      </ProfilesListContainer>
    </>
  );
}





  // async function fetchData() {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const options = {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     };

  //     const profiles = [];
  //     let offset = 0;

  //     while (offset < totalProfiles) {
  //       const response = await axios.get(
  //         `${url}&offset=${offset}`,
  //         options
  //       );
  //       profiles.push(...response.data);
  //       offset += 100; // Increment offset by 100 for the next batch
  //     }

  //     setAllProfiles(profiles);
  //     setDisplayedProfiles(profiles.slice(0, limit));
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.toString());
  //   } finally {
  //     setLoading(false);
  //   }
  // }



{/*

  useEffect(() => {
    fetchData();
  }, [accessToken, url]);

  async function fetchData() {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(url, options);
      setAllProfiles(response.data);
      setDisplayedProfiles(response.data.slice(0, limit));
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }


*/}