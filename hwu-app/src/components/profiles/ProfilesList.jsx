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
import { SectionContainer } from "../styledComponents/Containers";

export default function ProfilesList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalProfiles, setTotalProfiles] = useState(0);
  const [allProfiles, setAllProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const url = BASE_URL + PROFILES_PATH + `?sortOrder=asc&limit=${limit}&offset=${(page - 1) * limit}`;
    
  const [auth] = useContext(AuthContext);
  const accessToken = auth.accessToken;
      
  useEffect(() => {
    fetchData();
  }, [fetchData, page, limit]);

  async function fetchData() {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.get(url, options);
      setAllProfiles(response.data);
      setTotalProfiles(response.data.length);
    } catch (error) {
      console.log(error);
      setError(error.toString());
      
      setTimeout(() => {
        fetchData();
      }, 10000);
    } finally {
      setLoading(false);
    }
  }
  
  function handleNextPage() {
    if (page * limit < totalProfiles) {
      setPage((prevPage) => prevPage + 1);
    }
    console.log(page);
  }
  
  function handlePrevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Paragraph align="center">{error}</Paragraph>
      ) : (
        <>
          <ProfilesListContainer>
            <ul>
              {allProfiles.slice(0, limit).map((profile) => {
                return (
                  <li key={profile.email}>
                    <Link to={
                      profile.name === auth.name
                        ? `/account`
                        : `/profiles/${profile.name}`
                    }>
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
          </ProfilesListContainer>
          
          <SectionContainer>
            <button onClick={handlePrevPage} disabled={page === 1}>Prev</button>
            <button onClick={handleNextPage} disabled={page * limit >= allProfiles}>Next</button>
          </SectionContainer>
        </>
      )}
    </>
  );
}
