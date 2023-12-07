import { Link } from 'react-router-dom';
import BoardGame from '../../components/boardGame/boardGame';
import { signal } from '@preact/signals';

export default function Snake() {
  const hasGameStarted = signal(false);

  return (
    <div className="snake-game">
      <div className={`container ${!hasGameStarted ? 'blur' : ''}`}>
        <div className="score"></div>
        {/* placeholder for boardgame component */}
        <BoardGame hasGameStarted={hasGameStarted}></BoardGame>
        <dialog open>Press Button to Play</dialog>
      </div>
      <div className="container">
        <Link to="/">Go Back</Link>
        <div className="row">
          <h1>How to Play:</h1>
          <div className="instruction">
            <p>
              <b>Instruction: </b>
              Please use the keys 'w', 'a', 's', 'd' to move the mouse
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
