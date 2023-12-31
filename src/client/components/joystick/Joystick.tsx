import { MouseEventHandler } from 'react';

type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

type Props = {
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
};
export default function Joystick(props: Props) {
  function handleUserInput(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget) {
      if (e) props.setDirection(e.currentTarget.value as Direction);
    }
  }
  return (
    <section className="joystick-container">
      <button onClick={handleUserInput} className="joy-up" value="ArrowUp">
        <svg viewBox="0 0 12 12">
          <polygon points="6 0, 12 12, 0 12" />
        </svg>
      </button>
      <button onClick={handleUserInput} className="joy-left" value="ArrowLeft">
        <svg viewBox="0 0 12 12">
          <polygon points="0 6, 12 0,12 12" />
        </svg>
      </button>
      <button
        onClick={handleUserInput}
        className="joy-right"
        value="ArrowRight">
        <svg viewBox="0 0 12 12">
          <polygon points="0 0, 12 6, 0 12" />
        </svg>
      </button>
      <button onClick={handleUserInput} className="joy-down" value="ArrowDown">
        <svg viewBox="0 0 12 12">
          <polygon points="0 0, 6 12, 12 0" />
        </svg>
      </button>
    </section>
  );
}
