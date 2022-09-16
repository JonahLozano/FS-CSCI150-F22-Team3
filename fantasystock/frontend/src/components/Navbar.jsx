import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faMagnifyingGlass,
  faHouse,
  faUser,
  faUserGroup,
  faCog,
  faFootball,
} from "@fortawesome/free-solid-svg-icons";

// <i class="fa-solid fa-magnifying-glass"></i>

function Navbar(props) {
  const [sideNav, setSideNav] = useState(false);

  const handleEvent = (event) => {
    setSideNav(!sideNav);
  };

  return (
    <div className="NavbarContainerContainer">
      <nav className="NavbarContainer">
        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="NavbarHamburgerMenu"
          onClick={handleEvent}
        >
          ☰
        </button>

        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="NavbarLogoBtn"
        >
          FantasyStock
        </button>

        <form className="NavbarForm">
          <input
            type="search"
            placeholder="Search for a League"
            aria-label="Search"
          />
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>

        <button
          className="NavbarSignInUpBtn"
          type="button"
          aria-label="Sign-Up or Sign-In"
        >
          <FontAwesomeIcon icon={faUser} /> Sign in
        </button>

        <button
          className="NavbarSettings"
          type="button"
          aria-label="Sign-Up or Sign-In"
        >
          ⋮
        </button>
      </nav>

      {sideNav ? (
        <nav className="VerticalNavbarContainer1">
          <div className="VerticalNavbarIcons1">
            <FontAwesomeIcon icon={faHouse} /> Home
          </div>
          <div className="VerticalNavbarIcons1">
            <FontAwesomeIcon icon={faFootball} /> Leagues
          </div>
          <div className="VerticalNavbarIcons1">
            <FontAwesomeIcon icon={faUser} /> Profile
          </div>
          <div className="VerticalNavbarIcons1">
            <FontAwesomeIcon icon={faUserGroup} /> Friends
          </div>
          <div className="VerticalNavbarIcons1">
            <FontAwesomeIcon icon={faCog} /> Settings
          </div>
        </nav>
      ) : (
        <nav className="VerticalNavbarContainer2">
          <div className="VerticalNavbarIcons2">
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <div className="VerticalNavbarIcons2">
            <FontAwesomeIcon icon={faFootball} />
          </div>
          <div className="VerticalNavbarIcons2">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="VerticalNavbarIcons2">
            <FontAwesomeIcon icon={faUserGroup} />
          </div>
          <div className="VerticalNavbarIcons2">
            <FontAwesomeIcon icon={faCog} />
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
