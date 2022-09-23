import React from "react";
import SigninBtn from "../../components/SigninBtn/SigninBtn";
import LoggedInBtn from "../../components/LoggedinBtn/LoggedinBtn";
import SettingsBtn from "../../components/SettingsBtn/SettingsBtn";
import FloatingTab from "../../components/FloatingTab/FloatingTab";
import { useSelector, useDispatch } from "react-redux";
import { toggle as fTabToggler } from "../../redux/fTabState";
import OutsideAlerter from "../../helpers/OutsideAlerter";

function LoginSet(props) {
  const fTabToggle = useSelector((state) => state.fTabState.value);
  const loggedIn = useSelector((state) => state.authState.value);
  const dispatch = useDispatch();
  return (
    <OutsideAlerter>
      <span>
        {loggedIn ? (
          <LoggedInBtn onClick={() => dispatch(fTabToggler())} />
        ) : (
          <SigninBtn onClick={() => dispatch(fTabToggler())} />
        )}
        {!loggedIn && (
          <SettingsBtn
            onClick={() => {
              dispatch(fTabToggler());
            }}
          />
        )}
        {fTabToggle && <FloatingTab />}
      </span>
    </OutsideAlerter>
  );
}

export default LoginSet;
