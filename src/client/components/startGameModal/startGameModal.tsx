import { Signal } from '@preact/signals';
import { useContext } from 'react';
import { AppState } from '../../main';
type Props = {
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StartGameModal({ setHasGameStarted }: Props) {
  return (
    <div
      style={{}}
      className="start-game-modal"
      role="dialog"
      aria-labelledby="dialog1Title"
      aria-describedby="dialog1Desc">
      <h2 id="dialog1Title">Start Game Modal</h2>
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
