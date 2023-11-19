import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CanvasState, Snake } from '../../types/boardgame';

export default function BoardGame() {
  const [canvasSize, setCanvasSize] = useState<number[]>([500, 500]);
  const boardGameRef: React.Ref<HTMLCanvasElement> = useRef(null);
  const ctx: CanvasRenderingContext2D | null = null;
  const canvasState: CanvasState = {
    width: 0,
    height: 0,
    grid: [10, 10]
  };
  const snake: Snake = {
    segSize: canvasState.height * 0.1
  };

  //useLayoutEffect seems to be the more correct than useState
  useLayoutEffect(() => {
    if (boardGameRef?.current) {
      resize(canvasState);
      //make this x,y coords
      setCanvasSize([canvasState.width, canvasState.height]);
      drawBoard(boardGameRef.current, canvasState, ctx);
    }
  }, [boardGameRef]);

  return (
    <div>
      <canvas ref={boardGameRef} width={canvasSize[0]} height={canvasSize[1]}>
        No Game Available
      </canvas>
    </div>
  );
}

function drawBoard(
  canvas: HTMLCanvasElement,
  canvasState: CanvasState,
  ctx: CanvasRenderingContext2D | null
) {
  ctx = canvas.getContext('2d');
  if (ctx) {
    //create a snake object (maybe class)
    // const startCoord = [canvas.width / 2 - 15, canvas.height / 2 - 15];
    ctx.fillStyle = 'rgb(165,165,165)';
    // ctx.arcTo(0, 0, 0, 0, 5);
    // ctx.fillRect();
  }
}
function drawSnake() {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        break;
      case 'S':
      case 'ArrowDown':
        break;
      case 'A':
      case 'ArrowLeft':
        break;
      case 'D':
      case 'ArrowRight':
        break;
      default:
        null;
    }
  });

  const snake = {
    head: 0,
    next: null,
    last: null
  };
}

function loadGame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {}

function resize(canvasState: CanvasState) {
  const size = window.innerWidth;
  if (size >= 1024) {
    canvasState.height = 500;
    canvasState.width = 500;
  } else if (size >= 600) {
    canvasState.height = 300;
    canvasState.width = 300;
  } else {
    canvasState.height = 200;
    canvasState.width = 200;
  }
}
