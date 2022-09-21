import React from "react";
import {
  faHouse,
  faUserGroup,
  faCog,
  faFootball,
  faShoppingCart,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import LogoBtn from "../../components/LogoBtn/LogoBtn";
import SearchBar from "../../components/SearchBar/SearchBar";
import HamburgerToggle from "../../components/HamburgerToggle/HamburgerToggle";
import ClickableIcons from "../../components/ClickableIcons/ClickableIcons";
import LoginSet from "../../components/LoginSet/LoginSet";
import { useSelector, useDispatch } from "react-redux";
import { toggle as sidebarToggler } from "../../redux/sidebarState";

function Navigation(props) {
  const sidebarToggle = useSelector((state) => state.sidebarState.value);
  const dispatch = useDispatch();

  return (
    <nav className="NavbarContainerContainer">
      <div className="NavbarContainer">
        <HamburgerToggle onClick={() => dispatch(sidebarToggler())} />
        <LogoBtn />
        <SearchBar />
        <LoginSet />
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
            to="/"
            icon={faAddressCard}
            name="Profile"
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
            to="/"
            icon={faAddressCard}
            design="VerticalNavbarIcons2"
          />
          <ClickableIcons to="/" icon={faCog} design="VerticalNavbarIcons2" />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
