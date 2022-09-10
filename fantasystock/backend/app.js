const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const port = 5000;
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const GetPrice = require("./routes/getPrice");
const userRoutes = require("./routes/users");

mongoose.connect("mongodb://localhost:27017/fantasystock", {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connect error:"));
db.once("open", () => {
  console.log("Database connected");
});

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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/fakeuser", async (req, res) => {
  const user = new User({
    email: "jonah@gmail.com",
    username: "jonah",
  });
  const newUser = await User.register(user, "password1");
  res.send(newUser);
});

app.use("/register", userRoutes);
app.use("/getPrice", GetPrice);

app.get("/", (req, res) => res.send("Hi"));

app.listen(port, () => console.log(`Listening on port ${port}`));
