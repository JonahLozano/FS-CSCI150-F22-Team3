import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LeagueCenter() {
  const [leagues, setLeagues] = useState({});
  const [show, setShow] = useState(false);

  useEffect((event) => {
    axios
      .get(`/register/view/leagues`)
      .then((response) => {
        console.log(response.data);
        setLeagues(response.data);
        setShow(true);
      })
      .catch((error) => {
        setShow(false);
      });
  }, []);

  return (
    <div>
      <h1>Active Leagues</h1>
      {show &&
        leagues.activeLeagues.map((league, index) => (
          <div key={index}>
            <Link className="searchResult" to={`/league/${league._id}`}>
              <div className="searchResultTitle">{league.title}</div>
            </Link>
          </div>
        ))}
      <h1>Passed Leagues</h1>
      {show &&
        leagues.passedLeagues.map((league, index) => (
          <div key={index}>
            <Link className="searchResult" to={`/league/${league._id}`}>
              <div className="searchResultTitle">{league.title}</div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default LeagueCenter;
