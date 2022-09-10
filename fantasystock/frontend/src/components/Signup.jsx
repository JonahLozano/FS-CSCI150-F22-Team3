import React, { useState } from "react";
import axios from "axios";

function Signup(props) {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [unique, setUnique] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/register", {
        email: mail,
        username: name,
        password: pwd,
      })
      .then(function (response) {
        if (response.data.name === "UserExistsError") {
          setUnique("User Already Exists");
        } else {
          setUnique("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    setMail("");
    setName("");
    setPwd("");
  };

  const updateMail = (event) => {
    setMail(event.target.value);
  };
  const updateName = (event) => {
    setName(event.target.value);
  };
  const updatePwd = (event) => {
    setPwd(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{name === "" ? "" : `Hello, ${name}!`}</h2>
        <h2>{unique}</h2>
        <div>
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input type="text" name="email" onChange={updateMail} value={mail} />
        </div>
        <div>
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input
            type="text"
            name="username"
            onChange={updateName}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={updatePwd}
            value={pwd}
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default Signup;
