import React, { useState } from "react";
import axios from "axios";

function Stock(props) {
  const [price, setPrice] = useState(0);

  const updatePrice = () => {
    axios
      .get("/getPrice")
      .then((response) => {
        setPrice(response.data.aPrice.slice(0, -2));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <button onClick={updatePrice}>Update Price</button>
      <h1> AMZN is: {price}</h1>
    </div>
  );
}

export default Stock;
