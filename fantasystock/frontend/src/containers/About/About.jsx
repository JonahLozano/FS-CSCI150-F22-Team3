import React from "react";
import "./About.css";

function About(props) {
  return (
    <div className="aboutPage">
      <div className="specialThanks">
        <h1 className="teamHeader">Special Thanks:</h1>
        <h2 className="teamSubHeader">Project Manager: Jonah Lozano</h2>
        <h2 className="teamSubHeader">Frontend: Robert Mawhinney</h2>
        <h2 className="teamSubHeader">Backend: Luis Valencia</h2>
        <h2 className="teamSubHeader">UI/UX: Dustin Vang</h2>
        <h2 className="teamSubHeader">Quality Assurance: Quan Nguyen</h2>
        <h2 className="teamSubHeader">Tester: Jaspinder Singh</h2>
      </div>
      <div className="aboutProject">
        <h3 className="aboutTitle">About this project</h3>
        <p className="aboutParagraph">
          This project is to create a fun, easy-to-use, and risk-free experience
          for our game'ifed version of the stock market. The idea for this
          project came from the idea of combining the stock market with fantasy
          football.
        </p>
      </div>
    </div>
  );
}

export default About;
