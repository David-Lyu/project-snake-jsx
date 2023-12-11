import { Link } from 'react-router-dom';
import BoardGame from '../../components/boardGame/boardGame';
import { effect, signal } from '@preact/signals';
import { useLayoutEffect, useRef } from 'react';

export default function Snake() {
  const hasGameStarted = signal(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.addEventListener('click', () => {
        hasGameStarted.value = true;
        dialogRef.current!.close();
      });
    }
  }, []);

  return (
    <div className="snake-game">
      <div className={`container ${!hasGameStarted ? 'blur' : ''}`}>
        <div className="score"></div>
        {/* placeholder for boardgame component */}
        <BoardGame hasGameStarted={hasGameStarted}></BoardGame>
        <dialog open ref={dialogRef}>
          Press Button to Play
        </dialog>
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
