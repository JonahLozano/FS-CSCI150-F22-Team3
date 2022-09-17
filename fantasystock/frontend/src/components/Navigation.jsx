import React, { useState } from "react";
import SigninBtn from "./SigninBtn";
import {
  faHouse,
  faUser,
  faUserGroup,
  faCog,
  faFootball,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import LogoBtn from "./LogoBtn";
import SearchBar from "./SearchBar";
import SettingsBtn from "./SettingsBtn";
import HamburgerToggle from "./HamburgerToggle";
import ClickableIcons from "./ClickableIcons";

function Navigation(props) {
  const [showSideNav, setShowSideNav] = useState(false);
  const callback = (toggle) => {
    setShowSideNav(toggle);
  };

  return (
    <div className="NavbarContainerContainer">
      <nav className="NavbarContainer">
        <HamburgerToggle onClick={callback} />

        <LogoBtn />

        <SearchBar />

        <SigninBtn isLoggedin={props.isLoggedin} />

        <SettingsBtn />
      </nav>

      {showSideNav ? (
        <nav className="VerticalNavbarContainer1">
          <ClickableIcons
            to="/"
            icon={faHouse}
            name="Home"
            design="VerticalNavbarIcons1"
          />
          <ClickableIcons
            to="/stocks"
            icon={faFootball}
            name="League"
            design="VerticalNavbarIcons1"
          />
          <ClickableIcons
            to="/"
            icon={faUser}
            name="Profile"
            design="VerticalNavbarIcons1"
          />
          <ClickableIcons
            to="/"
            icon={faUserGroup}
            name="Friends"
            design="VerticalNavbarIcons1"
          />
          <ClickableIcons
            to="/"
            icon={faShoppingCart}
            name="Store"
            design="VerticalNavbarIcons1"
          />
          <ClickableIcons
            to="/"
            icon={faCog}
            name="Settings"
            design="VerticalNavbarIcons1"
          />
        </nav>
      ) : (
        <nav className="VerticalNavbarContainer2">
          <ClickableIcons to="/" icon={faHouse} design="VerticalNavbarIcons2" />
          <ClickableIcons
            to="/stocks"
            icon={faFootball}
            design="VerticalNavbarIcons2"
          />
          <ClickableIcons to="/" icon={faUser} design="VerticalNavbarIcons2" />
          <ClickableIcons
            to="/"
            icon={faUserGroup}
            design="VerticalNavbarIcons2"
          />
          <ClickableIcons
            to="/"
            icon={faShoppingCart}
            design="VerticalNavbarIcons2"
          />
          <ClickableIcons to="/" icon={faCog} design="VerticalNavbarIcons2" />
        </nav>
      )}
    </div>
  );
}

export default Navigation;
