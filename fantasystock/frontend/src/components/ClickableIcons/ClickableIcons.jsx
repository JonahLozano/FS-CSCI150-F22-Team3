import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ClickableIcons.css";

function ClickableIcons(props) {
  return (
    <Link className={props.design} to={props.to}>
      <FontAwesomeIcon icon={props.icon} /> {props.name}
    </Link>
  );
}

export default ClickableIcons;
