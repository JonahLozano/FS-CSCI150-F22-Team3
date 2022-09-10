const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/user");

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/", jsonParser, async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
