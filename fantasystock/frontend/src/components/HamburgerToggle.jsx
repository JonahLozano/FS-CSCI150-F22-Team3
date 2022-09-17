import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function HamburgerToggle(props) {
  const [sideNav, setSideNav] = useState(true);

  const handleEvent = (event) => {
    setSideNav(!sideNav);
    props.onClick(sideNav);
    console.log(sideNav);
  };

  return (
    <div
      aria-label="Toggle navigation"
      className="NavbarHamburgerMenu"
      onClick={handleEvent}
    >
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
}

export default HamburgerToggle;
