/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { CanvasState, SnakeBody } from '../../types/boardgame';
import GameBoard from '../../store/boardGame/boardGame';
import { AppState } from '../../main';
import Snake from '../../store/snake/snake';
import BoardGameState from '../../store/boardGame/boardGame';

export default function BoardGame() {
  console.log('hello');
  const { snake: snakeState, boardGame: boardGameState } = useContext(AppState);
  const [canvasSize, setCanvasSize] = useState<number[]>([500, 500]);
  const boardGameRef: React.Ref<HTMLCanvasElement> = useRef(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const cancelAnimationReturn = useRef<number>(0);
  const canvasState: CanvasState = {
    width: 0,
    height: 0,
    grid: [10, 10],
    hasStarted: false
  };

  function animateSnake() {
    cancelAnimationReturn.current = window.requestAnimationFrame(animateSnake);
    drawSnake(canvasState, ctx.current!, snakeState.value!);
  }
  function resetGame() {
    console.log(cancelAnimationReturn);
    window.cancelAnimationFrame(cancelAnimationReturn.current);
  }

  //useLayoutEffect seems to be the more correct than useState
  useLayoutEffect(() => {
    console.log('inside layout effect');
    if (boardGameRef?.current) {
      resize(canvasState);
      //make this x,y coords
      setCanvasSize([canvasState.width, canvasState.height]);
      //need to change return value to ctx and pass in bordGameState
      ctx.current = drawBoard(
        boardGameRef.current,
        canvasState,
        boardGameState.value
      );
      snakeState.value = new Snake();

      animateSnake();
      return () => {
        window.cancelAnimationFrame(cancelAnimationReturn.current);
      };
    }
  }, [boardGameRef]);

  return (
    <div>
      <button className="reset-game" onClick={resetGame}>
        Click to reset
      </button>
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
  boardGameState: BoardGameState | null
) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'rgb(165,165,165)';
    ctx.fillRect(
      canvasState.grid[0],
      canvasState.grid[1],
      canvasState.width,
      canvasState.height
    );
  }
  return ctx;
}

function drawSnake(
  canvasState: CanvasState,
  ctx: CanvasRenderingContext2D,
  snakeState: Snake
) {
  console.log('running?');
  let snakeBody: SnakeBody | null = snakeState.snakeBody;
  ctx.restore();
  ctx.beginPath();
  snakeState.moveSnake(5, 4);
  while (snakeBody?.next) {
    // snakeState.moveSnake(4, 5);
    snakeBody = snakeBody!.next;
    ctx.fillRect(
      snakeBody.coord[0],
      snakeBody.coord[1],
      snakeState.snakeSegSize[0],
      snakeState.snakeSegSize[1]
    );
    ctx.fillStyle = 'rgb(0,0,255)';
  }
}

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
