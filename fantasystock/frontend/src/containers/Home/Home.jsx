import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect((event) => {
    axios
      .get(`/news`)
      .then((response) => {
        setArticles(response.data);
        // console.log(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div id="homePage">
      {articles.map((article, index) => (
        <div className="articleCard" key={`uniqueId${index}`}>
          <img
            className="articleCardImage"
            src={article.urlToImage}
            alt="Article"
          />{" "}
          <div className="articleHeader">
            {article.title}
          </div>
          <div className="articleCreatedAt">{article.createdAt}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;
