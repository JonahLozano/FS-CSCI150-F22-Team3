const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const League = require("../models/league");
const User = require("../models/user");

var jsonParser = bodyParser.json();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.post("/create", isLoggedIn, jsonParser, async (req, res) => {
  // ADD LEAGUE TO USERS ACTIVE LEAGUE
  // MAKE SURE START DATE IS AFTER CURRENT DAY
  // MAKE SURE END DATE IS AFTER THAT
  if (
    req.body.title === undefined ||
    req.body.stocks === undefined ||
    req.body.visibility === undefined ||
    req.body.start === undefined ||
    req.body.end === undefined
  )
    return;

  const leagueData = {
    host: req.user._id,
    title: req.body.title,
    players: [
      {
        player: req.user._id,
        stocks: req.body.stocks.map((stockData) => {
          return {
            ticker: stockData.stock,
            quantity: stockData.quantity,
            position: stockData.position,
          };
        }),
      },
    ],
    visibility: req.body.visibility,
    commentsection: [],
    start: new Date(req.body.start),
    end: new Date(req.body.end),
  };

  (await League.create(leagueData)).save();
});

router.patch("/join", jsonParser, async (req, res) => {
  // ADD LEAGUE TO USERS ACTIVE LIST
  // DONT LET USER JOIN IF ALREADY JOINED
  // MAKE SURE USER IS LOGGED IN
  // MAKE SURE START DATE IS AFTER CURRENT DATE
  // console.log(req.body);
  if (req.body.gameID === undefined || req.body.stocks === undefined) return;

  const exists = League.exists({ _id: req.body.gameID });

  if (exists) {
    const game = await League.findById(req.body.gameID);

    game.players.push({
      player: req.user._id,
      stocks: req.body.stocks.map((stockData) => {
        return {
          ticker: stockData.stock,
          quantity: stockData.quantity,
          position: stockData.position,
        };
      }),
    });
    game.save();
  }
});

router.get("/search", jsonParser, async (req, res) => {
  if (req.query.page === undefined || req.query.page < 1) return;

  const leagues = await League.find({});

  leagues.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));

  const ans = leagues.slice((req.query.page - 1) * 25, req.query.page * 24);

  res.send(ans);
});

router.patch("/comment", isLoggedIn, jsonParser, async (req, res) => {
  if (req.body.comment === undefined) return;

  const commentData = {
    comment: req.body.comment,
    owner: req.user._id,
    likes: 0,
    dislikes: 0,
    replies: [],
  };

  const exists = League.exists({ _id: req.body.gameID });

  if (exists) {
    const game = await League.findById(req.body.gameID);

    console.log(game);

    game.commentsection.push(commentData);
    game.save();
  }
});

router.patch("/comment/edit", jsonParser, async (req, res) => {
  if (req.body.gameID === undefined || req.body.commentID === undefined) return;

  const exists1 = League.exists({ _id: req.body.gameID });

  if (exists1) {
    const game = await League.findById(req.body.gameID);
    const aComment = game.commentsection.map((comment) => {
      if (comment._id.toString() === req.body.commentID) {
        const aCopy = comment;
        aCopy.comment = req.body.comment;
        return aCopy;
      } else {
        return comment;
      }
    });
    game.commentsection = aComment;
    game.save();
  }
});

router.patch("/comment/delete", isLoggedIn, jsonParser, async (req, res) => {
  console.log(req.body);
  if (req.body.gameID === undefined || req.body.commentID === undefined) return;

  const exists1 = League.exists({ _id: req.body.gameID });

  if (exists1) {
    const game = await League.findById(req.body.gameID);
    const aComment = game.commentsection.filter((comment) => {
      return comment._id.toString() !== req.body.commentID;
    });
    game.commentsection = aComment;
    game.save();
  }
});

router.patch("/comment/reply", isLoggedIn, jsonParser, async (req, res) => {
  // console.log(req.body);
  if (req.body.comment === undefined) return;

  const commentData = {
    reply: req.body.comment,
    replyowner: req.user._id,
    likes: 0,
    dislikes: 0,
  };

  const exists = League.exists({ _id: req.body.gameID });

  if (exists) {
    const game = await League.findById(req.body.gameID);

    // console.log(game);

    game.commentsection.forEach(
      (ele) =>
        ele._id.toString() === req.body.commentID &&
        ele.replies.push(commentData)
    );

    console.log(game);
    game.save();
  }
});

router.get("/:id", async (req, res) => {
  const exists = League.exists({ _id: req.params.id });

  if (exists) {
    const game = await League.findById(req.params.id);
    // console.log(game);

    const host = await User.findById({ _id: game.host });

    const players = await Promise.all(
      game.players.map(async (data) => {
        return {
          player: await User.findById(data.player),
          stocks: data.stocks,
        };
      })
    );

    const commentCollection = await Promise.all(
      game.commentsection.map(async (data) => {
        return {
          comment: data.comment,
          owner: await User.findById(data.owner),
          likes: data.likes,
          dislikes: data.dislikes,
          replies: await Promise.all(
            data.replies.map(async (ele) => {
              const replyUser = await User.findById(ele.replyowner);
              console.log(replyUser);
              return {
                reply: ele.reply,
                replyowner: replyUser,
                replylikes: ele.replylikes,
                replydislikes: ele.replydislikes,
                isOwner: ele.replyowner.toString() === req.user._id,
              };
            })
          ),
          isOwner: req.user._id === data.owner.toString(),
          commentID: data._id,
        };
      })
    );

    const aGame = {
      title: game.title,
      host,
      visibility: game.visibility,
      start: game.start,
      end: game.end,
      players,
      commentsection: commentCollection,
    };

    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log(aGame.commentsection);

    res.send(aGame);
  }
});

module.exports = router;
