import React from "react";
import { StyledNav, StyledNavLink } from "../styledComponents/Nav";
import { NavAvatar } from "../styledComponents/Avatars";
import defaultAvatar from "../../images/avatar_default.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserGroup } from "@fortawesome/free-solid-svg-icons";

export default function Nav({ avatar }) {
  return (
    <StyledNav>
      <li>
        <StyledNavLink to="/account" title="Account">
          <NavAvatar
            src={avatar ? avatar : defaultAvatar}
            alt="Profile avatar"
          />
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/dashboard" title="Dashboard">
          <FontAwesomeIcon icon={faHouse} />
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/profilelist" title="Profiles">
          <FontAwesomeIcon icon={faUserGroup} />
        </StyledNavLink>
      </li>
    </StyledNav>
  );
}
