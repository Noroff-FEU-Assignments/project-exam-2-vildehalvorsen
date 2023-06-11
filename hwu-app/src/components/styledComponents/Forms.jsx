import styled from "styled-components";
import colors from "../../theme/colors";
import borders from "../../theme/borders";
import typography from "../../theme/typography";

const StyledForm = styled.form`
  min-width: 200px;
  width: 100%;
  max-width: 300px;
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
  font-size: ${typography.body.xsmall};
  border-radius: ${borders.mainBorder};
  padding: 10px;
  width: 100%;
  margin-bottom: 25px;
  filter: drop-shadow(0 3px 4px ${colors.gray});

  &:focus {
    outline: 2px solid ${colors.primary};
  }
  
  &#searchInput {
    width: 300px;
  }
`;

const StyledTextarea = styled.textarea`
  appearance: none;
  resize: none;
  font-family: ${typography.body.fontFamily};
  font-size: ${typography.body.xsmall};
  border: 1px solid ${colors.gray};
  border-radius: ${borders.mainBorder};
  padding: 10px;
  height: 100px;
  width: 100%;
  margin-bottom: 25px;

  &:focus {
    outline: 2px solid ${colors.primary};
  }
`;

export { StyledForm, StyledInput, StyledTextarea };
