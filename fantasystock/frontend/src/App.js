import "./App.css";
import Stocks from "../src/components/Stocks";
import Navigation from "./containers/Navigation";
import Unauthorized from "./components/UnAuthenticated";
import React, { useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
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
      <main className="App-header">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/loggedin" element={null} />
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
