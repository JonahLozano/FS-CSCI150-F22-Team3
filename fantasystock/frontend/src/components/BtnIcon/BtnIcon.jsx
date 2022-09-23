import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ClickableIcons(props) {
  return (
    <div className={props.design} to={props.to} onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} /> {props.name}
    </div>
  );
}

export default ClickableIcons;
