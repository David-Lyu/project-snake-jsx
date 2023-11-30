/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { CanvasState } from '../../types/boardgame';
import GameBoard from '../../store/boardGame/boardGame';
import { AppState } from '../../main';
import Snake from '../../store/snake/snake';

export default function BoardGame() {
  const { snake: snakeState, boardGame: boardGameState } = useContext(AppState);
  console.log('hello');
  snakeState.value = new Snake();

  boardGameState.value = new GameBoard();
  const [canvasSize, setCanvasSize] = useState<number[]>([500, 500]);
  const boardGameRef: React.Ref<HTMLCanvasElement> = useRef(null);
  const ctx: CanvasRenderingContext2D | null = null;
  const canvasState: CanvasState = {
    width: 0,
    height: 0,
    grid: [10, 10],
    hasStarted: false
  };
  let drawnBoard = null;

  function animateSnake() {
    drawSnake(canvasState);
  }

  //useLayoutEffect seems to be the more correct than useState
  useLayoutEffect(() => {
    if (boardGameRef?.current) {
      resize(canvasState);
      //make this x,y coords
      setCanvasSize([canvasState.width, canvasState.height]);
      drawnBoard = drawBoard(boardGameRef.current, canvasState, ctx);

      window.requestAnimationFrame(animateSnake);
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
  drawSnake(canvasState);
  return new GameBoard();
}

function drawSnake(canvasState: CanvasState) {}

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
