import React, { useMemo, useState } from "react";
import axios from "axios";
import SkeletonElement from "./SkeletonElement";
import "./Stocks.css";

function Stock(props) {
  const [data, setData] = useState([
    {
      ticker: String,
      name: String,
      sector: String,
      price: Number,
    },
  ]);
  const [show, setShow] = useState(false);
  const skeleArrSize = 100;

  useMemo((event) => {
    axios
      .get("/getPrice")
      .then((response) => {
        response.data.map((ele, index) =>
          setData((oldArr) => [...oldArr, ele])
        );
        console.log(data);
        setShow(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setShow(false);
      });
  }, []);

  return (
    <div>
      {show
        ? data.map((ele) => (
            <div className="stockCard">
              <h1>{ele.ticker}</h1>
              <h2>{ele.name}</h2>
              <h2>{ele.sector}</h2>
              <h2>{ele.price}</h2>
            </div>
          ))
        : [...Array(skeleArrSize)].map(() => <SkeletonElement type="div" />)}
    </div>
  );
}

export default Stock;
