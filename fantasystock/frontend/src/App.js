import "./App.css";
import Stocks from "./containers/Stocks/Stocks";
import Navigation from "./containers/Navigation/Navigation";
import Unauthorized from "./containers/Unauthenticated/Unauthenticated";
import About from "./containers/About/About";
import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./redux/authState";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.authState.value);

  useMemo(() => {
    axios
      .get("/register/checkAuthentication")
      .then((res) => {
        res.data.authenticated ? dispatch(login()) : dispatch(logout());
      })
      .catch((error) => {
        dispatch(logout());
      });
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <main className="App-header">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/loggedin" element={null} />
          <Route path="/about" element={<About />} />
          {loggedIn ? (
            <Route path="/stocks" element={<Stocks />} />
          ) : (
            <Route path="/stocks" element={<Unauthorized />} />
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
