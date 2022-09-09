const express = require("express");
const app = express();
const session = require("express-session");
const port = 5000;
const GetPrice = require("./routes/getPrice");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");

// app.use(passport.initialize());
// app.use(passport.session());

const sessionConfig = {
  secret: "thiswillnotbeusedinproduction",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use("/getPrice", GetPrice);

app.get("/", (req, res) => res.send("Hi"));

app.listen(port, () => console.log(`Listening on port ${port}`));
