import "./App.css";
import Stocks from "../src/components/Stocks";
import Navigation from "./components/Navigation";
import Unauthorized from "./components/Unauthorized";
import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useMemo(() => {
    axios
      .get("/register/checkAuthentication")
      .then((res) => {
        setLoggedIn(res.data.authenticated);
      })
      .catch((error) => {
        setLoggedIn(false);
      });
  }, []);

  return (
    <div className="App">
      <Navigation isLoggedin={loggedIn} />
      <header className="App-header">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/loggedin" element={null} />
          {loggedIn ? (
            <Route path="/stocks" element={<Stocks />} />
          ) : (
            <Route path="/stocks" element={<Unauthorized />} />
          )}
        </Routes>
      </header>
    </div>
  );
}

export default App;
