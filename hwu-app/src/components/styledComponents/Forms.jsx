import styled from "styled-components";
import colors from "../../theme/colors";
import borders from "../../theme/borders";
import typography from "../../theme/typography";
import device from "../../theme/device";

const StyledForm = styled.form`
  min-width: 200px;
  width: 100%;
  max-width: 350px;
  margin: 65px auto;

  p {
    color: ${colors.error};
    font-size: ${typography.body.xsmall};
    margin: -25px 0 25px 10px;
  }

  button {
    margin-bottom: 10px;
  }
`;

const StyledInput = styled.input`
  appearance: none;
  border: none;
  background: ${colors.white};
  font-family: ${typography.body.fontFamily};
  font-size: ${typography.body.mobileSize};
  border-radius: ${borders.mainBorder};
  padding: 15px 10px;
  width: 100%;
  margin-bottom: 25px;
  filter: drop-shadow(0 3px 4px ${colors.gray});

  &:focus,
  &:focus-visible {
    outline: 2px solid ${colors.primary};
    border-radius: ${borders.mainBorder};
  }

  &#searchInput {
    width: 300px;
  }

  @media (${device.tablet}) {
    font-size: ${typography.body.tabletSize};
    margin-bottom: 35px;
    &#searchInput {
      width: 500px;
    }
  }
`;

const StyledTextarea = styled.textarea`
  appearance: none;
  resize: none;
  border: none;
  font-family: ${typography.body.fontFamily};
  font-size: ${typography.body.mobileSize};
  border-radius: ${borders.mainBorder};
  padding: 10px;
  height: 100px;
  width: 100%;
  margin-bottom: 25px;
  filter: drop-shadow(0 3px 4px ${colors.gray});

  &:focus,
  &:focus-visible {
    outline: 2px solid ${colors.primary};
    border-radius: ${borders.mainBorder};
  }

  @media (${device.tablet}) {
    font-size: ${typography.body.tabletSize};
    margin-bottom: 35px;
  }
`;

export { StyledForm, StyledInput, StyledTextarea };
