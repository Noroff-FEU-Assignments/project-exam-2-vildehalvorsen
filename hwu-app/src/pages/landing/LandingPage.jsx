import React from "react";

import Registration from "./functions/RegistrationForm";
import LoginForm from "./functions/LoginForm";
import Head from "../../components/layout/Head";

export default function LandingPage() {
  return (
    <>
      <Head />
      <div>LandingPage</div>

      <Registration />
      <LoginForm />
    </>
  );
}
