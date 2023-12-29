import { MouseEventHandler } from 'react';

type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

type Props = {
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
};
export default function Joystick(props: Props) {
  function handleUserInput(e: React.MouseEventHandler<HTMLButtonElement>) {
    // props.setDirection(e)
  }
  return (
    <section className="joystick-container">
      <button value="ArrowLeft">Left Arrow </button>
      <button value="ArrowUp">Up Arrow</button>
      <button value="ArrowRight">Right Arrow</button>
      <button value="ArrowDown">Down Arrow</button>
    </section>
  );
}
