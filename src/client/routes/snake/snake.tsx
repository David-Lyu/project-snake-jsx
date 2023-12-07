import { Link } from 'react-router-dom';
import BoardGame from '../../components/boardGame/boardGame';

export default function Snake() {
  return (
    <div className="snake-game">
      <div className="container">
        <div className="score"></div>
        {/* placeholder for boardgame component */}
        <BoardGame></BoardGame>
        <Link to="/">Go Back</Link>
        <dialog open>Press Button to Play</dialog>
      </div>
      <div className="container">
        <div>
          <h1>How to Play:</h1>
          <div className="instruction">
            <b>Instruction:</b>
            <p>Please use the keys 'w', 'a', 's', 'd' to move the mouse</p>
          </div>
          <div className="goal">
            <b>Goals:</b>
            <p>
              The goal is to fill the snake board with the snake without touch
              its own body or the ends of the board
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
