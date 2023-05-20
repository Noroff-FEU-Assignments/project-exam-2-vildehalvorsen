import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import AuthContext from "../../../context/AuthContext";

import { BASE_URL, LOGIN_PATH } from "../../../constants/api";
import { regEmail } from "../../../components/common/ValidateInputs";

const url = BASE_URL + LOGIN_PATH;

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAuth(response.data);
      window.location.reload();
    } catch (error) {
      console.log("error: ", error.response.data.errors);
      setLoginError(error.response.data.errors[0].message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
      {loginError}
      <fieldset disabled={submitting}>
        <div>
          <div>
            <label htmlFor="email" hidden>
              Email
            </label>
            <input
              name="email"
              id="login-email"
              placeholder="email"
              {...register("email", {
                required: true,
                pattern: regEmail,
              })}
            />
            {errors.email && (
              <p>Must be a valid stud.noroff.no or noroff.no email address</p>
            )}
          </div>

          <div>
            <label htmlFor="password" hidden>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password && <p>Must be at least 8 characters</p>}
          </div>
        </div>
        <button id="loginBtn">{submitting ? "Logging in..." : "Log in"}</button>
      </fieldset>
    </form>
  );
}
