import "./App.css";
import Stocks from "../src/components/Stocks";
import Signup from "../src/components/Signup";
import Dashboard from "../src/components/Dashboard";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("/register/checkAuthentication")
      .then((res) => {
        res.data.authenticated
          ? console.log("logged in")
          : console.log("no idea");
        setLoggedIn(res.data.authenticated);
      })
      .catch((error) => {
        console.log("not logged in");
        setLoggedIn(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>FantasyStock</h1>
        <h2>{`Logged in with google: ${loggedIn}`}</h2>
        <Signup />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          {loggedIn ? (
            <Route path="/stocks" element={<Stocks />} />
          ) : (
            <Route path="/" />
          )}
        </Routes>
        <ul>
          <li>
            <a className="App-link" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="App-link" href="/stocks">
              Stocks
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default App;
