import React, { useState, useMemo } from "react";
import axios from "axios";
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
import FloatingTab from "../components/FloatingTab";
import { useSelector, useDispatch } from "react-redux";
import { toggle as sidebarToggler } from "../redux/sidebarState";
import { toggle as fTabToggler } from "../redux/fTabState";

function Navigation(props) {
  const [pic, setPic] = useState("");
  const sidebarToggle = useSelector((state) => state.sidebarState.value);
  const fTabToggle = useSelector((state) => state.fTabState.value);
  const dispatch = useDispatch();

  useMemo((event) => {
    axios
      .get("/register/profilepicture")
      .then((response) => {
        setPic(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <nav className="NavbarContainerContainer">
      <div className="NavbarContainer">
        <HamburgerToggle onClick={() => dispatch(sidebarToggler())} />
        <LogoBtn />
        <SearchBar />
        <SigninBtn
          isLoggedin={props.isLoggedin}
          pic={pic}
          onClick={() => dispatch(fTabToggler())}
        />
        {!props.isLoggedin && (
          <SettingsBtn onClick={() => dispatch(fTabToggler())} />
        )}
        {fTabToggle && <FloatingTab isLoggedin={props.isLoggedin} />}
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
