const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user");
require("dotenv").config();

const GetPrice = require("./routes/getPrice");
const userRoutes = require("./routes/users");

mongoose.connect(process.env.DB_HOST, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connect error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sessionConfig = {
  secret: process.env.SESSION_SECERET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use("/register", userRoutes);
app.use("/getPrice", GetPrice);

app.get("/", (req, res) => res.send("Hi"));

app.listen(process.env.port, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
