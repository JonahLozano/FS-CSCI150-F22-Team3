import React from "react";
import axios from "axios";
import OutsideAlerter from "../utils/OutsideAlerter";

function FloatingTab(props) {
  const handleClick = () => {
    axios
      .post("/register/logout", {})
      .then(function (response) {
        console.log(response);
        window.location.replace("http://localhost:3000");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <OutsideAlerter>
      <div className="NavbarFloatingTab">
        <div className="NavbarFloatingTabTab">Appearance: Dark</div>
        {props.isLoggedin && (
          <div className="NavbarFloatingTabTab" onClick={handleClick}>
            Sign out
          </div>
        )}
      </div>
    </OutsideAlerter>
  );
}

export default FloatingTab;
