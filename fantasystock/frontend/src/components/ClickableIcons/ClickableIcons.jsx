import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ClickableIcons.css";

function ClickableIcons(props) {
  return (
    <Link className={props.design} to={props.to}>
      <div className="centerIcon">
        <FontAwesomeIcon icon={props.icon} />
      </div>

      {props.name}
    </Link>
  );
}

export default ClickableIcons;
