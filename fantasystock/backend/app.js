const express = require('express');
var request = require('request')
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send("Hi"));
app.get('/getPriceAMZN', (req, res) => {
  request("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=5min&apikey=XZTQJ1SRNWG3A787", (error, response, body) => {
    if(!error && response.statusCode == 200){
      var parsedBody = JSON.parse(body);
      var aTime = parsedBody["Meta Data"]["3. Last Refreshed"];
      var aPrice = parsedBody["Time Series (5min)"][aTime]["4. close"];
      res.send({aPrice});
    }
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
