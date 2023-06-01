import styled from "styled-components";
import colors from "../../theme/colors";
import { NavLink } from "react-router-dom";

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  padding: 8px 0;

  li {
    margin: 0 23px;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${colors.primary};
  font-size: 20px;

  img {
    margin-top: 5px;
    margin-bottom: -3px;
  }

  svg {
    margin-top: 6px;
    margin-bottom: 3px;
  }

  &.active {
    border-bottom: 2px solid ${colors.primary};
  }

  &:hover {
    color: ${colors.primaryHover};
  }
`;

export { StyledNav, StyledNavLink };
