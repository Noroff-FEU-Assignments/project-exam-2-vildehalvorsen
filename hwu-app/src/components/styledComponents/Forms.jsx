import styled from "styled-components";
import colors from "../../theme/colors";
import borders from "../../theme/borders";
import typography from "../../theme/typography";

const StyledForm = styled.form`
  min-width: 200px;
  width: 100%;
  max-width: 300px;
  margin: 40px auto;
  
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
  font-family: ${typography.body.fontFamily};
  font-size: ${typography.body.xsmall};
  border: 1px solid ${colors.gray};
  border-radius: ${borders.mainBorder};
  padding: 10px;
  width: 100%;
  margin-bottom: 25px;

  &:focus {
    outline: 2px solid ${colors.primary};
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