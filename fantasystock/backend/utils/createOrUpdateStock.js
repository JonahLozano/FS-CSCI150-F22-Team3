require("dotenv").config();
var request = require("request");
const Stock = require("../models/stock");
require("dotenv").config();
const batchMap = require("./batchmap");
const asyncFilter = require("./asyncFilter");
const stocks = require("../data/stocks");

const createOrUpdateStock = (stock) => {
  request(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.ticker}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_KEY}`,
    async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        try {
          setTimeout(() => {
            try {
              const parsedBody = JSON.parse(body);
              const aTime = parsedBody["Meta Data"]["3. Last Refreshed"];
              const aPrice =
                parsedBody["Time Series (5min)"][aTime]["4. close"];
              Stock.findOrCreate(
                { ticker: stock.ticker },
                {
                  ticker: stock.ticker,
                  name: stock.name,
                  sector: stock.sector,
                  price: aPrice,
                }
              )
                .then((res) => {
                  Stock.findOneAndUpdate(res, {
                    price: aPrice,
                  }).then((res) => res);
                })
                .catch((error) => console.log(`Mongo Error: ${error}`));
            } catch (error) {
              console.log(error);
            }
          }, 1000 * 72);
        } catch (error) {
          console.log(error);
        }
      }
    }
  );
};

module.exports = () => {
  asyncFilter(stocks, async (ele) => {
    try {
      const [aStock] = await Stock.find({ ticker: ele.ticker });
      if (aStock === undefined) {
        return true;
      } else {
        // console.log(
        //   `[${ele.ticker}] ${date} < ${new Date()} = ${date < new Date()}`
        // );
        const date = new Date(aStock.updatedAt);
        date.setHours(date.getHours() + 24);
        return date < new Date();
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }).then((res) => {
    console.log(res);
    batchMap(res, createOrUpdateStock);
  });
};
