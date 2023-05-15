import axios from "axios";

import { BASE_URL, PROFILES_PATH } from "../../../constants/api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import ProfilesModal from "../../../components/modal/ProfilesModal";

export default function DisplayProfileList() {
  const url = BASE_URL + PROFILES_PATH + `${"?sortOrder=asc"}`;

  const [auth] = useContext(AuthContext);
  const [allProfiles, setAllProfiles] = useState([]);
  const [displayedProfiles, setDisplayedProfiles] = useState([]);
  const [search, setSearch] = useState("");
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
      setAllProfiles(data);
      setDisplayedProfiles(data.slice(0, 10));
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const filteredList = allProfiles.filter((profile) =>
      profile.name
        .toLowerCase()
        .includes(e.target.value.replace(/\s+/g, "_").toLowerCase())
    );
    setDisplayedProfiles(filteredList.slice(0, 10));
  }

  const handleOpenModal = () => {
    setProfilesModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setProfilesModalIsOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <input
        value={search}
        onChange={handleSearch}
        placeholder="Search profiles"
      />
      <ul className="profileList">
        {displayedProfiles.map((profile) => {
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
      <button onClick={handleOpenModal}>Browse</button>
      <ProfilesModal
        isOpen={profilesModalIsOpen}
        onRequestClose={handleCloseModal}
      />
    </div>
  );
}
