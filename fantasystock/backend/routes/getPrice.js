const express = require("express");
const router = express.Router();
var request = require("request");

router.get("/", (req, res) => {
  request(
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=5min&apikey=XZTQJ1SRNWG3A787",
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body);
        var aTime = parsedBody["Meta Data"]["3. Last Refreshed"];
        var aPrice = parsedBody["Time Series (5min)"][aTime]["4. close"];
        res.send({ aPrice });
      }
    }
  );
});

module.exports = router;
