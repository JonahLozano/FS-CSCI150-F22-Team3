const bodyParser = require("body-parser");
const User = require("../models/user");
const League = require("../models/league");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { findById } = require("../models/stock");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const adjectives = require("../data/adjectives");
const animals = require("../data/animals");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

var jsonParser = bodyParser.json();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/register/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      await User.findOrCreate(
        { googleId: profile.id },
        {
          username: `${
            adjectives[Math.floor(Math.random() * adjectives.length)]
          } ${animals[Math.floor(Math.random() * animals.length)]}`,
          displayName: profile.displayName,
          familyName: profile.name.familyName,
          givenName: profile.name.givenName,
          photo: profile.photos[0].value,
        },
        (err, user) => cb(err, user)
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/register/protected");
  }
);

router.get("/auth/failure", (req, res) => {
  res.send("something went wrong..");
});

router.get("/protected", isLoggedIn, (req, res) => {
  res.redirect("http://localhost:3000/loggedin");
});

router.get("/checkAuthentication", (req, res) => {
  const authenticated = req.user !== undefined;

  res.status(200).json({
    authenticated,
  });
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get(
  "/profilepicture",
  isLoggedIn,
  async (req, res) =>
    await User.findById(req.user._id)
      .then((aUser) => res.send(aUser.photo))
      .catch((err) => console.log(err))
);

router.get(
  "/profile",
  isLoggedIn,
  async (req, res) =>
    await User.findById(req.user._id).then((aUser) => res.send(aUser))
);

router.patch("/edit", isLoggedIn, jsonParser, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (
    req.body.username.length <= 32 &&
    req.body.bio.length <= 300 &&
    user.icons.includes(req.body.activeIcon)
  ) {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        username: req.body.username,
        bio: req.body.bio,
        activeIcon: req.body.activeIcon,
      }
    );
  }
});

router.delete("/delete", isLoggedIn, async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.user._id })
      .then((req1, res1) => {
        req.logout(function (err) {
          if (err) {
            console.log(err);
            return;
          }
          return res.redirect("/");
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.patch("/addfriend", isLoggedIn, jsonParser, async (req, res) => {
  if (req.body.friendcode.length <= 32) {
    try {
      console.log(req.user._id);
      console.log(req.body.friendcode);
      const user = await User.findById(req.user._id);
      const friend = await User.findById(req.body.friendcode);
      console.log(user);
      console.log(friend);

      friend.friendRequests.push(user);
      friend.save();
    } catch {}
  }
});

router.patch("/deletefriend", isLoggedIn, jsonParser, async (req, res) => {
  if (req.body.friendcode.length <= 32) {
    try {
      const user = await User.findById(req.user._id);

      console.log(req.body.friendcode);
      console.log(
        user.friends.filter((ele) => ele.toString() !== req.body.friendcode)
      );

      user.friends = user.friends.filter(
        (ele) => ele.toString() !== req.body.friendcode
      );
      user.save();
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/friends", async (req, res) => {
  const user = await User.findById(req.user._id);
  const allFriends = [];

  await Promise.all(
    user.friends.map(async (ele) => {
      const tmp = await User.findById(ele);
      allFriends.push(tmp);
    })
  );

  res.send(allFriends);
});

router.get("/friendsrequests", async (req, res) => {
  const user = await User.findById(req.user._id);
  const allFriends = [];

  await Promise.all(
    user.friendRequests.map(async (ele) => {
      const tmp = await User.findById(ele);
      allFriends.push(tmp);
    })
  );

  res.send(allFriends);
});

router.get("/view/leagues", isLoggedIn, async (req, res) => {
  const host = await User.findById({ _id: req.user._id });

  const activeLeagues = await Promise.all(
    host.activeLeagues.map(async (leagueID) => {
      const aLeague = await League.findById({ _id: leagueID });
      return { title: aLeague.title, _id: leagueID };
    })
  );

  const passedLeagues = await Promise.all(
    host.passedLeagues.map(async (leagueID) => {
      const aLeague = await League.findById({ _id: leagueID });
      return { title: aLeague.title, _id: leagueID };
    })
  );

  const allLeagues = {
    activeLeagues,
    passedLeagues,
  };

  res.send(allLeagues);
});

// DOES NOT WORK
router.patch(
  "/friend/request/accept",
  isLoggedIn,
  jsonParser,
  async (req, res) => {
    // CHECK TO SEE IF ALL PARAMETERS EXIST
    // CHECK FRIEND REQUESTS TO SEE IF USER TO BE ADDED IS THERE
    // CHECK TO SEE IF USER EXISTS
    // MOVE USER FROM FRIEND REQUEST LIST TO FRIENDS LIST
    // SAVE

    if (req.body.friendcode.length <= 32) {
      try {
        // GET CURRENT USER
        const user = await User.findById(req.user._id);

        // GET FRIEND
        const friend = await User.findById(req.body.friendcode);

        // ADD FRIEND TO FRIENDS LIST
        user.friends.push(friend);
        friend.friends.push(user);

        // REMOVE FRIEND FROM FRIEND REQUEST LIST
        user.friendRequests = user.friendRequests.filter(
          (request) => request.toString() !== friend._id.toString()
        );

        // SAVE USER DATA
        user.save();
        friend.save();
      } catch {}
    }
  }
);

// DOES NOT WORK
router.patch("/friend/request/decline", jsonParser, async (req, res) => {
  // CHECK TO SEE IF ALL PARAMETERS EXIST
  // CHECK FRIEND REQUESTS TO SEE IF USER TO BE ADDED IS THERE
  // CHECK TO SEE IF USER EXISTS
  // REMOVE USER FROM FRIEND REQUEST LIST
  // SAVE

  if (req.body.friendcode.length <= 32) {
    try {
      // GET CURRENT USER
      const user = await User.findById(req.user._id);

      // GET FRIEND
      const friend = await User.findById(req.body.friendcode);

      // REMOVE FRIEND FROM FRIEND REQUEST LIST
      user.friendRequests = user.friendRequests.filter(
        (request) => request.toString() !== friend._id.toString()
      );

      // SAVE USER DATA
      user.save();
    } catch {}
  }
});

router.get("/:id", async (req, res) => {
  const aUser = await User.findById(req.params.id);
  const theUser = await User.findById(req.user._id);

  const isFriend = theUser.friends.reduce(
    (acc, ele) => acc || ele.toString() === req.params.id,
    false
  );

  // const ans = {
  //   _id: aUser._id,
  //   username: aUser.username,
  //   photo: aUser.photo,
  //   bio: aUser.bio,
  // };

  res.send(aUser);
});

module.exports = router;
