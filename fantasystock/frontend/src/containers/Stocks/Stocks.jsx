import React, { useMemo, useState } from "react";
import axios from "axios";
import SkeletonElement from "./SkeletonElement";

function Stock(props) {
  const [price, setPrice] = useState(0);
  const [show, setShow] = useState(false);

  useMemo((event) => {
    axios
      .get("/getPrice")
      .then((response) => {
        setPrice(response.data.aPrice.slice(0, -2));
        setShow(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setShow(false);
      });
  }, []);

  return (
    <div>
      {show ? (
        <span>
          <h1>AMZN</h1>
          <h2>{price}</h2>
        </span>
      ) : (
        <span>
          <SkeletonElement type="h1" />
          <SkeletonElement type="h2" />
        </span>
      )}
    </div>
  );
}

export default Stock;
