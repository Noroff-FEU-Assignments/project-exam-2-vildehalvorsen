import React, { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import { BASE_URL, REGISTER_PATH } from "../../constants/api";
import {
  regEmail,
  replaceSpaces,
  validateName,
} from "../../constants/formValidation";

import { StyledForm, StyledInput } from "../styledComponents/Forms";
import { ButtonPrimary } from "../styledComponents/Buttons";
import { FlexContainer } from "../styledComponents/Containers";
import { Paragraph } from "../styledComponents/Paragraph";

const url = BASE_URL + REGISTER_PATH;

export default function RegistrationForm({ showAlert }) {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    setSubmitting(true);
    
    data.email = data.email.toLowerCase();

    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } catch (error) {
      console.log("error: ", error.response.data.errors[0].message);
      const regError = error.response.data.errors[0].message;
      showAlert(regError, "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} id="regForm">
      <div>
        <div>
          <label htmlFor="name" hidden>
            Name
          </label>
          <StyledInput
            name="name"
            id="reg-name"
            placeholder="name"
            onKeyDown={replaceSpaces}
            {...register("name", {
              required: "Name is required",
              validate: validateName,
              minLength: {
                value: 2,
                message: "Name must be at least two characters",
              },
            })}
          />
          {errors.name && <Paragraph>{errors.name.message}</Paragraph>}
        </div>

        <div>
          <label htmlFor="email" hidden>
            Email
          </label>
          <StyledInput
            name="email"
            id="reg-email"
            placeholder="email@stud.noroff.no"
            {...register("email", {
              required: "A valid stud.noroff.no email is required",
              pattern: {
                value: regEmail,
                message: "Must be a valid stud.noroff.no email address",
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
            id="reg-password"
            placeholder="choose password"
            {...register("password", {
              required: "Password is required",
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
        <ButtonPrimary id="regBtn">
          {submitting ? "Validating..." : "Submit"}
        </ButtonPrimary>
      </FlexContainer>
    </StyledForm>
  );
}
