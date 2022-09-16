import React, { useEffect, useState } from "react";

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
          <button type="submit">Search</button>
        </form>

        <button
          className="NavbarSignInUpBtn"
          type="button"
          aria-label="Sign-Up or Sign-In"
        >
          Sign in
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
          <div className="VerticalNavbarIcons">🏠 Home</div>
          <div className="VerticalNavbarIcons">🏠 Home</div>
          <div className="VerticalNavbarIcons">🙋 Friends</div>
        </nav>
      ) : (
        <nav className="VerticalNavbarContainer2">
          <div className="VerticalNavbarIcons">🏠</div>
          <div className="VerticalNavbarIcons">🏠</div>
          <div className="VerticalNavbarIcons">🙋</div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
