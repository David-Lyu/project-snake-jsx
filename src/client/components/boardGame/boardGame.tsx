import { useLayoutEffect, useRef, useState } from 'react';
import { CanvasState, InitSnake } from '../../types/boardgame';

export default function BoardGame() {
  const [canvasSize, setCanvasSize] = useState<number[]>([500, 500]);
  const boardGameRef: React.Ref<HTMLCanvasElement> = useRef(null);
  const ctx: CanvasRenderingContext2D | null = null;
  const canvasState: CanvasState = {
    width: 0,
    height: 0,
    grid: [10, 10],
    hasStarted: false
  };
  const snake: InitSnake = {
    segSize: [
      canvasState.width * (canvasState.grid[0] / 100),
      canvasState.height * (canvasState.grid[1] / 100)
    ],
    snakeBody: {
      next: null,
      last: null,
      coord: [canvasState.width / 2, canvasState.height / 2]
    }
  };

  snake.snakeBody.coord[0] -= snake.segSize[0];
  snake.snakeBody.coord[1] -= snake.segSize[1];

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

/** HELPER FUNCTIONS **/
function drawBoard(
  canvas: HTMLCanvasElement,
  canvasState: CanvasState,
  ctx: CanvasRenderingContext2D | null
) {
  ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'rgb(165,165,165)';
  }
}

function drawSnake(canvasState: CanvasState) {
  if (!canvasState.hasStarted) {
    window.addEventListener('keydown', onKeyDown);
  }
}

function loadGame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {}

/** NAMED EVENT FUNCTIONS **/
//todo: Need to figure out a way to get window to resize
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
function onKeyDown(e: KeyboardEvent) {
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
}
