import { useAlert } from "../../hooks/useAlert";

import Head from "../../components/layout/Head";
import AlertMessage from "../../components/common/AlertMessage";
import DisplayForms from "./functions/DisplayForms";



export default function LandingPage() {
  const { showMessage, message, type, showAlert } = useAlert();
  
  return (
    <>
      <Head />

      {showMessage && <AlertMessage type={type} message={message} />}

      <DisplayForms showAlert={showAlert}/>
    </>
  );
}
