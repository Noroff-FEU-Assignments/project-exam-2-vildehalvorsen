import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL, LOGIN_PATH } from "../../constants/api";

import { regEmail } from "../../constants/formValidation";

import { StyledForm, StyledInput } from "../styledComponents/Forms";
import { Paragraph } from "../styledComponents/Paragraph";
import { ButtonPrimary } from "../styledComponents/Buttons";
import { FlexContainer } from "../styledComponents/Containers";

const url = BASE_URL + LOGIN_PATH;

export default function LoginForm({ showAlert }) {
  const [submitting, setSubmitting] = useState(false);
  const [, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    setSubmitting(true);

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAuth(response.data);
      navigate("/account");
    } catch (error) {
      console.log("error: ", error.response.data.errors);
      const loginError = error.response.data.errors[0].message;
      showAlert(loginError, "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} id="loginForm">
      <div>
        <div>
          <label htmlFor="email" hidden>
            Email
          </label>
          <StyledInput
            name="email"
            id="login-email"
            placeholder="email"
            {...register("email", {
              required: true,
              pattern: {
                value: regEmail,
                message:
                  "Must be a valid stud.noroff.no or noroff.no email address",
              },
            })}
          />
          {errors.email && <Paragraph>{errors.email.message}</Paragraph>}
        </div>

        <div>
          <label htmlFor="password" hidden>
            Password
          </label>
          <StyledInput
            type="password"
            name="password"
            id="login-password"
            placeholder="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Must be at least 8 characters",
              },
            })}
          />
          {errors.password && <Paragraph>{errors.password.message}</Paragraph>}
        </div>
      </div>
      <FlexContainer center>
        <ButtonPrimary id="loginBtn">
          {submitting ? "Logging in..." : "Log in"}
        </ButtonPrimary>
      </FlexContainer>
    </StyledForm>
  );
}
