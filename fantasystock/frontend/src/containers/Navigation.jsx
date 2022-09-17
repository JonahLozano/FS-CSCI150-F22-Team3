import React, { useState } from "react";
import SigninBtn from "../components/SigninBtn";
import {
  faHouse,
  faUser,
  faUserGroup,
  faCog,
  faFootball,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import LogoBtn from "../components/LogoBtn";
import SearchBar from "../components/SearchBar";
import SettingsBtn from "../components/SettingsBtn";
import HamburgerToggle from "../components/HamburgerToggle";
import ClickableIcons from "../components/ClickableIcons";

function Navigation(props) {
  const [showSideNav, setShowSideNav] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const callback = (toggle) => setShowSideNav(toggle);
  const handleClick = () => setShowSettings(!showSettings);

  return (
    <nav className="NavbarContainerContainer">
      <div className="NavbarContainer">
        <HamburgerToggle onClick={callback} />
        <LogoBtn />
        <SearchBar />
        <SigninBtn isLoggedin={props.isLoggedin} />
        <button onClick={handleClick}>thing</button>
        {showSettings && (
          <div className="NavbarFloatingTab">
            <div className="NavbarFloatingTabTab">Appearance: Dark</div>
            <div className="NavbarFloatingTabTab">Sign out</div>
          </div>
        )}
        {!props.isLoggedin && <SettingsBtn />}
      </div>

      {showSideNav ? (
        <div className="VerticalNavbarContainer1">
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
        </div>
      ) : (
        <div className="VerticalNavbarContainer2">
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
        </div>
      )}
    </nav>
  );
}

export default Navigation;
