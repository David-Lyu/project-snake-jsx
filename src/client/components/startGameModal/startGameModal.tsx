import { Signal } from '@preact/signals';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { AppState } from '../../main';
//need to move it out maybe board game?
type Props = {
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StartGameModal({ setHasGameStarted }: Props) {
  const { canvasState } = useContext(AppState);
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    canvasState.value.resize();
    setSize([canvasState.value.width, canvasState.value.height]);
  }, []);

  return (
    <div
      style={{
        width: size[0],
        height: size[1]
      }}
      className="start-game-modal"
      role="dialog"
      aria-labelledby="dialog1Title"
      aria-describedby="dialog1Desc">
      <h2 id="dialog1Title">Start Game?</h2>
      <p id="dialog1Desc">You can click Play or Press enter on the button</p>
      <button
        onClick={(e) => {
          setHasGameStarted(true);
        }}>
        Play
      </button>
    </div>
  );
}
