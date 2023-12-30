import { MouseEventHandler } from 'react';

type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

type Props = {
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
};
export default function Joystick(props: Props) {
  function handleUserInput(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e);
    if (e.currentTarget) {
      if (e) props.setDirection(e.currentTarget.value as Direction);
    }
  }
  return (
    <section className="joystick-container">
      <button onClick={handleUserInput} value="ArrowLeft">
        Left Arrow
      </button>
      <button onClick={handleUserInput} value="ArrowUp">
        Up Arrow
      </button>
      <button onClick={handleUserInput} value="ArrowRight">
        Right Arrow
      </button>
      <button onClick={handleUserInput} value="ArrowDown">
        Down Arrow
      </button>
    </section>
  );
}
