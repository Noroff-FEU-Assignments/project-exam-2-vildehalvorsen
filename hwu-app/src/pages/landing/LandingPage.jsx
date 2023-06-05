import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRequireAuth from "../../hooks/useRequireAuth";

import { useAlert } from "../../hooks/useAlert";
import Head from "../../components/layout/Head";
import AlertMessage from "../../components/common/AlertMessage";
import DisplayForms from "../../components/authForms/DisplayForms";
import LoadingIndicator from "../../components/common/LoadingIndicator";

export default function LandingPage() {
  const checkAuth = useRequireAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkAuth) {
      navigate("/dashboard");
    }
  }, []);

  const { showMessage, message, type, showAlert } = useAlert();

  if (checkAuth) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Head />

      {showMessage && <AlertMessage type={type} message={message} />}

      <DisplayForms showAlert={showAlert} />
    </>
  );
}
