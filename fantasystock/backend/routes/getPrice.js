const express = require("express");
const router = express.Router();
var request = require("request");
require("dotenv").config();

router.get("/", (req, res) => {
  request(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=5min&apikey=${process.env.ALPHA_VANTAGE_KEY}`,
    async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        try {
          const parsedBody = JSON.parse(body);
          const aTime = parsedBody["Meta Data"]["3. Last Refreshed"];
          const aPrice = parsedBody["Time Series (5min)"][aTime]["4. close"];
          res.send({ aPrice });
        } catch (error) {
          console.log(error);
        }
      }
    }
  );
});

module.exports = router;
