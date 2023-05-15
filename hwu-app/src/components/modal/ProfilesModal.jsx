import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../constants/api";

export default function ProfilesModal({ isOpen, onRequestClose }) {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Hellooo</h2>
      <button onClick={onRequestClose}>Close</button>
      <ul className="profileList">
        {allProfiles.slice(0, 20).map((profile) => {
          return (
            <li key={profile.email} className="profileList__item">
              <Link to={`/profiles/${profile.name}`}>
                <img src={profile.avatar} alt="Profile avatar"></img>
                <p>{profile.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
