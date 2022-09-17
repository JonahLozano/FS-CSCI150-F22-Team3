import React, { useState, setState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function SigninBtn(props) {
  const [logged, setLogged] = useState(props.isLoggedin);

  const handleClick = () => {
    axios
      .post("/register/logout", {})
      .then(function (response) {
        console.log(response);
        setLogged(false);
        window.location.replace("http://localhost:3000");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // <span className="NavbarLoggedInBtn">

  return (
    <span onClick={handleClick}>
      {props.isLoggedin ? (
        <span className="NavbarSignInUpBtn">
          <FontAwesomeIcon icon={faUser} />{" "}
          <span className="NavbarSignInUpBtnText"> Sign out </span>
        </span>
      ) : (
        <a
          className="NavbarSignInUpBtn"
          href="http://localhost:5000/register/auth/google"
        >
          <FontAwesomeIcon icon={faUser} />{" "}
          <span className="NavbarSignInUpBtnText"> Sign in </span>
        </a>
      )}
    </span>
  );
}

export default SigninBtn;
