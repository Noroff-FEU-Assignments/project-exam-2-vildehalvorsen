import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {
  MobileCurtain,
  CurtainTop,
  LaptopContainer,
} from "../styledComponents/Curtain";
import { LogoHeading } from "../layout/LogoHeading";
import { ButtonPrimary, ButtonSecondary } from "../styledComponents/Buttons";

export default function DisplayForms({ showAlert }) {
  const [showLogin, setShowLogin] = useState(true);
  const [active, setActive] = useState(false);
  const [curtainAnimation, setCurtainAnimation] = useState(false);
  const [curtainSwitch, setCurtainSwitch] = useState(false);

  const toggleForm = () => {
    setShowLogin((prevState) => !prevState);

    if (showLogin) {
      setCurtainSwitch(true);
      setCurtainAnimation(true);
    }

    if (!showLogin) {
      setCurtainSwitch(false);
      setCurtainAnimation(false);
    }
  };

  const handleButtonClick = (isLogin) => {
    setActive(true);
    setShowLogin(isLogin);
  };

  return (
    <div>
      <LaptopContainer position={curtainSwitch}>
        <CurtainTop position={curtainSwitch} active={curtainAnimation}>
          {showLogin ? (
            <div>
              <LogoHeading line1="hang" line2="with" line3="us." />
              <Link onClick={toggleForm} className="laptopLink">
                {"Register now ->"}
              </Link>
            </div>
          ) : (
            <div>
              <LogoHeading line1="reg" line2="ister" />
              <Link onClick={toggleForm} className="laptopLink">
                {"<- Back to log in"}
              </Link>
            </div>
          )}
        </CurtainTop>
        {showLogin ? (
          <LoginForm showAlert={showAlert} />
        ) : (
          <RegistrationForm showAlert={showAlert} />
        )}
        <Link onClick={toggleForm} className="mobileLink">
          {showLogin ? "Register now ->" : "<- Back to log in"}
        </Link>
      </LaptopContainer>

      <MobileCurtain active={active}>
        <LogoHeading line1="hang" line2="with" line3="us." />

        <div className="btnContainer">
          <ButtonPrimary onClick={() => handleButtonClick(true)}>
            Login
          </ButtonPrimary>

          <ButtonSecondary onClick={() => handleButtonClick(false)}>
            Register
          </ButtonSecondary>
        </div>
      </MobileCurtain>
    </div>
  );
}
