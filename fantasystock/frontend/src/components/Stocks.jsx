import React, { useLayoutEffect, useMemo, useState } from "react";
import axios from "axios";

function Stock(props) {
  const [price, setPrice] = useState(0);

  useMemo((event) => {
    axios
      .get("/getPrice")
      .then((response) => {
        setPrice(response.data.aPrice.slice(0, -2));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div>
      <h1> AMZN is: {price}</h1>
    </div>
  );
}

export default Stock;
