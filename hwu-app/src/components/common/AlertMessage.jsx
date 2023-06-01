import React from "react";
import { AlertMessageContainer } from "../styledComponents/Alert";
import { Paragraph } from "../styledComponents/Paragraph";

export default function AlertMessage(props) {
  return (
    <AlertMessageContainer>
      <div className={props.type}>
        <Paragraph align="center" m0>
          {props.message}
        </Paragraph>
      </div>
    </AlertMessageContainer>
  );
}
