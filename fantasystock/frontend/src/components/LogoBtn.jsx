import React from "react";
import { Link } from "react-router-dom";

function LogoBtn(props) {
  return (
    <Link className="NavbarLogoBtn" aria-label="Logo" to="/">
      FantasyStock
    </Link>
  );
}

export default LogoBtn;
