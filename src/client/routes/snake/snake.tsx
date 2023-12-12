import { Link } from 'react-router-dom';
import BoardGame from '../../components/boardGame/boardGame';
import { Signal, effect, signal } from '@preact/signals';
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import StartGameModal from '../../components/startGameModal/startGameModal';
import { AppState } from '../../main';

export default function Snake() {
  //honestly better to refactor and just use useState
  const [hasGameStarted, setHasGameStarted] = useState(false);

  return (
    <div className="snake-game">
      <div className={`container ${!hasGameStarted ? 'blur' : ''}`}>
        {/* Placeholder for score board */}
        <div className="score"></div>
        {/* <BoardGame hasGameStarted={hasGameStarted}></BoardGame> */}
        {!hasGameStarted ? (
          <StartGameModal setHasGameStarted={setHasGameStarted} />
        ) : (
          <BoardGame setHasGameStarted={setHasGameStarted} />
        )}
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
