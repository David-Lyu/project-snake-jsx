import { Link } from "react-router-dom";
import BoardGame from "../../components/boardGame/boardGame";
import React, { useState } from "react";
import StartGameModal from "../../components/startGameModal/startGameModal";
import Scoreboard from "../../components/scoreboard/scoreboard";
import GlobalScoreUserInput from "../../components/globalScores/globalScoreUserInput";

export default function Snake() {
  //honestly better to refactor and just use useState
  const [hasGameStarted, setHasGameStarted] = useState(false);

  return (
    <div className="snake-game">
      <div className={`container`}>
        <Scoreboard hasGameStarted={hasGameStarted} />
        {!hasGameStarted ? (
          <StartGameModal setHasGameStarted={setHasGameStarted} />
        ) : (
          <BoardGame setHasGameStarted={setHasGameStarted} />
        )}
        <GlobalScoreUserInput />
      </div>
      <Link to={"/"}> Go Back to home page</Link>
      <div className="container">
        <div className="row">
          <h1>How to Play:</h1>
          <div className="instruction">
            <p>
              <b>Instruction: </b>
              Please use the keys 'w', 'a', 's', 'd' to move the mouse or if
              using mobile use the controller pad located on the bottom right of
              the game board.
            </p>
          </div>
          <div className="goal">
            <p>
              <b>Objective: </b>
              The goal is to fill the snake board with the snake without touch
              its own body or the ends of the board
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
