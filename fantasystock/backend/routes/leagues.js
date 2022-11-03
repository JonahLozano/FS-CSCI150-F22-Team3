const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const League = require("../models/league");
const Stock = require("../models/stock");
const User = require("../models/user");

var jsonParser = bodyParser.json();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.post("/create", isLoggedIn, jsonParser, async (req, res) => {

  const rightnow = new Date();
  //console.log("rightnow " + rightnow);
  const start = new Date(req.body.start);
  //console.log("start " + start);
  const end = new Date(req.body.end);
  //console.log("end " + end);

  // we have an issue where the input being parsed from start and end is a day off backwards 

  // use res.send({ data: req.body }) to display data being sent from frontend to backend:
  //res.send({ data: req.body });
  // example of data being sent:
  // data: {start: "2022-11-02", end: "2022-11-03", title: "temp1", visibility: "public", stocks: [{stock: "AAPL", quantity: 1, position: "long"}]}

  // check data is present and is of correct type
  if (
    (req.body.title === undefined || typeof req.body.title !== "string") ||
    req.body.stocks.length === 0 ||
    (req.body.visibility !== "public" && req.body.visibility !== "private") ||
    (req.body.start === undefined || typeof req.body.start !== "string") ||
    (req.body.end === undefined || typeof req.body.end !== "string") ||
    start <= rightnow ||
    start >= end
  ) {
    res.send({ created: false });
    return;
  }

  const leagueData = {
    host: req.user._id,
    title: req.body.title,
    players: [
      {
        player: req.user._id,
        stocks: await Promise.all(
          req.body.stocks.map(async (stockData) => {
            const price = await Stock.findOne({ ticker: stockData.stock });
            return {
              ticker: stockData.stock,
              quantity: stockData.quantity,
              position: stockData.position,
              priceAtTime: price.price,
            };
          })
        ),
      },
    ],
    visibility: req.body.visibility,
    commentsection: [],
    start: new Date(req.body.start),
    end: new Date(req.body.end),
  };

  const aThing = await (await League.create(leagueData)).save();

  const host = await User.findById({ _id: req.user._id });

  host.activeLeagues = [...host.activeLeagues, aThing._id];
  host.save();

  res.send({ created: true });
});

router.patch("/join", jsonParser, async (req, res) => {

  const host = await User.findById({ _id: req.user._id });
  const activeLeagues = host.activeLeagues;
  const in_league = activeLeagues.includes(req.body.gameID);

  // checking to make sure data is valid 
  if(req.body.gameID === undefined || req.body.stocks.length === 0){
    console.log("join failed1");
    return;
  }
  else{
    // now check the stocks input array (size can vary, need to check every possibility)
    for(let i = 0; i < req.body.stocks.length; i++){
        if(
          typeof req.body.stocks[i]["stock"] !== "string" ||
          typeof req.body.stocks[i]["quantity"] !== "string" ||
          (req.body.stocks[i]["position"] !== "long" && req.body.stocks[i]["position"] !== "short")
          )
        {
            console.log("join failed2");
            return;
        }
    }
  } 

  const exists = League.exists({ _id: req.body.gameID });

  if (exists) {
    if (!in_league) {
      host.activeLeagues = [...host.activeLeagues, req.body.gameID];
      host.save();
    }
    const game = await League.findById(req.body.gameID);

    game.players.push({
      player: req.user._id,
      stocks: await Promise.all(
        req.body.stocks.map(async (stockData) => {
          const price = await Stock.findOne({ ticker: stockData.stock });
          return {
            ticker: stockData.stock,
            quantity: stockData.quantity,
            position: stockData.position,
            priceAtTime: price.price,
          };
        })
      ),
    });
    game.save();
  }
});

// DOES NOT WORK
router.get("/search", jsonParser, async (req, res) => {
  if (req.query.page === undefined || req.query.page < 1) return;

  // SEARCH_CRITERIA = { TITLE:contains(something), VISIBILITY: "public", START_DATE: tomorrow }
  // const leagues = await league.find(SEARCH_CRITERIA);

  const leagues = await League.find({});

  leagues.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));

  const ans = leagues.slice((req.query.page - 1) * 25, req.query.page * 24);

  res.send(ans);
});

router.patch("/comment", isLoggedIn, jsonParser, async (req, res) => {

  // check all the comments contain chars



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

  // contains data 


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

  // check it exists and belongs to whoever made comment
  //console.log(req.body);

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

// // NOT DONE YET
// router.patch("/comment/like", isLoggedIn, jsonParser, async (req, res) => {
//   // CHECK IF ALL VARIABLES USED ARE RECIEVED
//   // CHECK IF LEAGUE REFERED TO EXISTS
//   // IF IT DOES THEN FIND THIS LEAGUE
//   // FIND THE COMMENT WHICH IS PART OF THIS LEAGUE
//   // INCREMENT LIKES UP BY ONE
//   // SAVE LEAGUE
// });

// // NOT DONE YET
// router.patch("/comment/dislike", isLoggedIn, jsonParser, async (req, res) => {
//   // CHECK IF ALL VARIABLES USED ARE RECIEVED
//   // CHECK IF LEAGUE REFERED TO EXISTS
//   // IF IT DOES THEN FIND THIS LEAGUE
//   // FIND THE COMMENT WHICH IS PART OF THIS LEAGUE
//   // INCREMENT DISLIKES UP BY ONE
//   // SAVE LEAGUE
// });

router.patch("/comment/reply", isLoggedIn, jsonParser, async (req, res) => {

  // comment user is replying to exists
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

// // THIS IS NOT DONE YET
// router.patch(
//   "/comment/reply/delete",
//   isLoggedIn,
//   jsonParser,
//   async (req, res) => {
//     // CHECK IF ALL VARIABLES USED ARE RECIEVED
//     // CHECK IF LEAGUE REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS LEAGUE
//     // CHECK IF COMMENT REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS COMMENT
//     // CHECK IF REPLY REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS REPLY AND DELETE
//     // SAVE LEAGUE
//   }
// );
// // THIS IS NOT DONE YET
// router.patch(
//   "/comment/reply/edit",
//   isLoggedIn,
//   jsonParser,
//   async (req, res) => {
//     // CHECK IF ALL VARIABLES USED ARE RECIEVED
//     // CHECK IF LEAGUE REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS LEAGUE
//     // CHECK IF COMMENT REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS COMMENT
//     // CHECK IF REPLY REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS REPLY AND EDIT
//     // SAVE LEAGUE
//   }
// );

// // NOT DONE YET
// router.patch(
//   "/comment/reply/like",
//   isLoggedIn,
//   jsonParser,
//   async (req, res) => {
//     // CHECK IF ALL VARIABLES USED ARE RECIEVED
//     // CHECK IF LEAGUE REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS LEAGUE
//     // CHECK IF COMMENT REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS COMMENT
//     // CHECK IF REPLY REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS REPLY AND INCREMENT ITS LIKES
//     // SAVE LEAGUE
//   }
// );

// // NOT DONE YET
// router.patch(
//   "/comment/rpely/dislike",
//   isLoggedIn,
//   jsonParser,
//   async (req, res) => {
//     // CHECK IF ALL VARIABLES USED ARE RECIEVED
//     // CHECK IF LEAGUE REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS LEAGUE
//     // CHECK IF COMMENT REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS COMMENT
//     // CHECK IF REPLY REFERED TO EXISTS
//     // IF IT DOES THEN FIND THIS REPLY AND INCREMENT ITS DISLIKES
//     // SAVE LEAGUE
//   }
// );

router.get("/:id", async (req, res) => {

  // make sure id exists

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
