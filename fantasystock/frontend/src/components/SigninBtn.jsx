import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function SigninBtn(props) {
  return (
    <span>
      {props.isLoggedin ? (
        <span onClick={props.onClick} className="NavbarLoggedInBtn">
          <FontAwesomeIcon icon={faUser} />{" "}
          <span className="NavbarSignInUpBtnText" />
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
