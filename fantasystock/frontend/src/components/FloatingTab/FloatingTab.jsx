import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/authState";
import "./FloatingTab.css";

function FloatingTab(props) {
  const loggedIn = useSelector((state) => state.authState.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    axios
      .post("/register/logout", {})
      .then(function (response) {
        console.log(response);
        dispatch(logout());
        window.location.replace("http://localhost:3000");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="NavbarFloatingTab">
      <div className="NavbarFloatingTabTab">Appearance: Dark</div>
      <Link className="NavbarFloatingTabTab" to="/About">
        About Us
      </Link>
      {loggedIn && (
        <div className="NavbarFloatingTabTab" onClick={handleClick}>
          Sign out
        </div>
      )}
    </div>
  );
}

export default FloatingTab;
