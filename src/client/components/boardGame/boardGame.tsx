import { useEffect, useRef } from 'react';

export default function BoardGame() {
  const boardGameRef = useRef(null);
  useEffect(() => {
    if (boardGameRef?.current) {
      //hello
      drawGame(boardGameRef.current);
      console.log(boardGameRef);
    }
  }, [boardGameRef]);
  return (
    <div>
      <canvas ref={boardGameRef}></canvas>
    </div>
  );
}

function drawGame(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
}
