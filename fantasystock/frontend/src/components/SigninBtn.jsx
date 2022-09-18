import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function SigninBtn(props) {
  return (
    <span>
      {props.isLoggedin ? (
        <img
          onClick={props.onClick}
          src={props.pic}
          className="NavbarLoggedInBtn"
          alt="profile"
        />
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
