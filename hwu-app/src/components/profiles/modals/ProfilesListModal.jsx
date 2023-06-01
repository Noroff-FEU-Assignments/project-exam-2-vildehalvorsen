import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../../constants/api";
import { ExitBtn } from "../../styledComponents/Buttons";

import defaultAvatar from "../../../images/avatar_default.jpg";
import LoadingIndicator from "../../common/LoadingIndicator";
import { Paragraph } from "../../styledComponents/Paragraph";

export default function ProfilesListModal({ isOpen, onRequestClose }) {
  const url = BASE_URL + PROFILES_PATH + `${"?sortOrder=asc"}`;

  const [auth] = useContext(AuthContext);
  const [allProfiles, setAllProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = auth.accessToken;

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
      const response = await axios.get(url, options);
      setAllProfiles(response.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ExitBtn onClick={onRequestClose}>Close</ExitBtn>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Paragraph align="center">{error}</Paragraph>
      ) : (
        <>
          <h2>Hang out with these:</h2>
          <ul>
            {allProfiles.slice(0, 20).map((profile) => {
              return (
                <li key={profile.email}>
                  <Link to={`/profiles/${profile.name}`}>
                    <img
                      src={profile.avatar ? profile.avatar : defaultAvatar}
                      alt="Profile avatar"
                    />
                    <p>{profile.name}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
      ;
    </Modal>
  );
}
