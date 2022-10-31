const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Inventory = require("../data/inventory.js");

const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

require("dotenv").config();

router.patch("/buy", jsonParser, async (req, res) => {
  // CHECK TO SEE IF ALL PARAMETERS ARE HERE
  // CHECK TO SEE IF ITEM ID IS REAL
  // FIND ITEM
  // FIND USER

  const host = await User.findById({ _id: req.user._id });
  const itemThing = Inventory.find((ele) => ele.name === req.body.item);
  const owns = Inventory.includes(itemThing.name);

  if (host.currency > itemThing.price && !owns) {
    console.log("Sufficient Funds");
    host.currency = host.currency - itemThing.price;
    host.icons.push(itemThing.name);
    host.save();
  } else {
    console.log("Insufficient Funds");
  }

  // DECREMENT USERS CURRENCY BY AMOUNT FOR ICON
  // ADD ITEM TO USER ICONS LIST
  // SAVE USER
});

router.get("/", async (req, res) => {
  res.send(Inventory);
});

module.exports = router;
