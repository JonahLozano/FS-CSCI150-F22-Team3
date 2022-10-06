import React from "react";
import {
  faHouse,
  faUserGroup,
  faCog,
  faFootball,
  faShoppingCart,
  faAddressCard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import LogoBtn from "../../components/LogoBtn/LogoBtn";
import SearchBar from "../../components/SearchBar/SearchBar";
import HamburgerToggle from "../../components/HamburgerToggle/HamburgerToggle";
import ClickableIcons from "../../components/ClickableIcons/ClickableIcons";
import LoginSet from "../../components/LoginSet/LoginSet";
import { useSelector, useDispatch } from "react-redux";
import { toggle as sidebarToggler } from "../../redux/sidebarState";
import "./Navigation.css";

function Navigation(props) {
  const sidebarToggle = useSelector((state) => state.sidebarState.value);
  const dispatch = useDispatch();

  return (
    <nav className="NavbarContainerContainer">
      <div className="NavbarContainer">
        <HamburgerToggle onClick={() => dispatch(sidebarToggler())} />
        <LogoBtn />
        <LoginSet />
        <SearchBar />
      </div>

      {sidebarToggle ? (
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
            to="/profile"
            icon={faAddressCard}
            name="Profile"
            design="VerticalNavbarIcons1"
          />
          <ClickableIcons
            to="/"
            icon={faEnvelope}
            name="Messages"
            design="VerticalNavbarIcons1"
          />
          <ClickableIcons
            to="/settings"
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
          <ClickableIcons
            to="/profile"
            icon={faAddressCard}
            design="VerticalNavbarIcons2"
          />
          <ClickableIcons
            to="/"
            icon={faEnvelope}
            design="VerticalNavbarIcons2"
          />
          <ClickableIcons
            to="/settings"
            icon={faCog}
            design="VerticalNavbarIcons2"
          />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
