import React, { useState, useMemo } from "react";
import axios from "axios";
import "./LoggedinBtn.css";

function LoggedinBtn(props) {
  const [pic, setPic] = useState("");

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
    <span>
      <img
        onClick={props.onClick}
        src={pic}
        referrerPolicy="no-referrer"
        className="NavbarLoggedInBtn noBtn"
        alt="profile"
      />
    </span>
  );
}

export default LoggedinBtn;
