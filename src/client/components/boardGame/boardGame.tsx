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
    drawSnake(canvasState, ctx.current!, snakeState.value!, resetGame);
  }
  function resetGame() {
    window.cancelAnimationFrame(cancelAnimationReturn.current);
  }

  function handleUserInput(e: KeyboardEvent) {
    onKeyDown(e, snakeState.value!);
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
      snakeState.value = new Snake(4, [
        canvasState.width / 2,
        canvasState.height / 2
      ]);

      animateSnake();
      window.addEventListener('keydown', handleUserInput);
      return () => {
        window.cancelAnimationFrame(cancelAnimationReturn.current);
        window.removeEventListener('keydown', handleUserInput);
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
    ctx.fillRect(0, 0, canvasState.width, canvasState.height);
  }
  return ctx;
}

function drawSnake(
  canvasState: CanvasState,
  ctx: CanvasRenderingContext2D,
  snakeState: Snake,
  resetGame: Function
) {
  let snakeBody: SnakeBody | null = snakeState.snakeBody;
  if (
    snakeBody.coord[0] < 0 ||
    snakeBody.coord[0] > canvasState.width ||
    snakeBody.coord[1] < 0 ||
    snakeBody.coord[1] > canvasState.width
  ) {
    resetGame();
  }
  console.log('hello');
  switch (snakeState.direction) {
    case 'up':
      snakeState.moveSnake(
        snakeBody.coord[0],
        snakeBody.coord[1] - snakeState.velocity
      );
      break;
    case 'down':
      snakeState.moveSnake(
        snakeBody.coord[0],
        snakeBody.coord[1] + snakeState.velocity
      );
      break;
    case 'left':
      snakeState.moveSnake(
        snakeBody.coord[0] - snakeState.velocity,
        snakeBody.coord[1]
      );
      break;
    case 'right':
      snakeState.moveSnake(
        snakeBody.coord[0] + snakeState.velocity,
        snakeBody.coord[1]
      );
      break;
  }

  // snakeState.moveSnake(5, 4);
  while (snakeBody) {
    ctx.fillStyle = 'rgb(0,0,255)';
    ctx.fillRect(
      snakeBody!.coord[0],
      snakeBody!.coord[1],
      snakeState.snakeSegSize[0],
      snakeState.snakeSegSize[1]
    );
    ctx.fill();
    snakeBody = snakeBody!.next;
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
function onKeyDown(e: KeyboardEvent, snakeState: Snake) {
  switch (e.key) {
    case 'w':
    case 'ArrowUp':
      if (snakeState.direction !== 'down') snakeState.direction = 'up';
      break;
    case 'S':
    case 'ArrowDown':
      if (snakeState.direction !== 'up') snakeState.direction = 'down';
      break;
    case 'A':
    case 'ArrowLeft':
      if (snakeState.direction !== 'right') snakeState.direction = 'left';
      break;
    case 'D':
    case 'ArrowRight':
      if (snakeState.direction !== 'left') snakeState.direction = 'right';
      break;
    default:
      null;
  }
}
