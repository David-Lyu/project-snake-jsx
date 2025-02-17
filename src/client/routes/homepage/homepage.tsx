// import { useState } from 'react';
import { Link } from "react-router-dom";
import React from "react";
import { globalScores } from "../../store/scoreboard/globalScores";
export default function HomePage() {
  // const [isDisclaimerClicked, setIsDisclaimerClicked] = useState(false);

  return (
    <div className="start-screen container">
      <div className="row start-screen-items">
        <h1>
          <span className="S">S</span>
          <span className="N">N</span>
          <span className="A">A</span>
          <span className="K">K</span>
          <span className="E">E</span>
        </h1>
        <h6>Please choose the following options:</h6>
        <button
          onClick={() => {
            console.log(globalScores);
            globalScores.isOpen.value = !globalScores.isOpen.value;
          }}
          className="global-scores"
        >
          Show Global Scores
        </button>
        <Link to="/play">Play Game</Link>
      </div>
      <section className="home-page-disclaimer">
        Disclaimer: This is used only for demonstration purposes and is still in
        progress.
      </section>
    </div>
  );
}
