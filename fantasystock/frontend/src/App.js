import "./App.css";
import Stocks from "../src/components/Stocks";
import Signup from "../src/components/Signup";
import Navbar from "./components/Navbar";
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
      <Navbar />
      <header className="App-header">
        <h2>{`Logged in with google: ${loggedIn}`}</h2>
        <Signup />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stocks">Stocks</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/loggedin" element={null} />
          {loggedIn && <Route path="/stocks" element={<Stocks />} />}
        </Routes>
      </header>
    </div>
  );
}

export default App;
