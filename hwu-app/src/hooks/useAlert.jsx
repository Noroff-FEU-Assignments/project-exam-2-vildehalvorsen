import { useState } from "react";

export const useAlert = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const showAlert = (msg, alertType) => {
    setMessage(msg);
    setType(alertType);
    setShowMessage(true);
    setTimeout(hideAlert, 3000);
  };

  const hideAlert = () => {
    setShowMessage(false);
    setMessage("");
    setType("");
  };

  return {
    message,
    type,
    showMessage,
    showAlert,
  };
};
