/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { CanvasState, SnakeBody } from '../../types/boardgame';
import GameBoard, { boardGameState } from '../../store/boardGame/boardGame';
import { AppState } from '../../main';
import Snake from '../../store/snake/snake';
import BoardGameState from '../../store/boardGame/boardGame';
import { Signal } from '@preact/signals';

export default function BoardGame(props: { hasGameStarted: Signal<boolean> }) {
  console.log('hello');
  const { snake: snakeState, boardGame: boardGameState } = useContext(AppState);
  const [canvasSize, setCanvasSize] = useState<number[]>([0, 0]);
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
    e.preventDefault();
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
        canvasState
        // boardGameState.value
      );
      snakeState.value = new Snake(
        4,
        [canvasState.width / 2, canvasState.height / 2],
        [canvasState.width * 0.1, canvasState.height * 0.1]
      );

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
      <canvas ref={boardGameRef} width={canvasSize[0]} height={canvasSize[1]}>
        No Game Available
      </canvas>
    </div>
  );
}

/** HELPER FUNCTIONS **/
function drawBoard(
  canvas: HTMLCanvasElement,
  canvasState: CanvasState
  // boardGameState: BoardGameState | null
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
    snakeBody.coord[0] >= canvasState.width - snakeState.snakeSegSize[0] ||
    snakeBody.coord[1] < 0 ||
    snakeBody.coord[1] >= canvasState.height - snakeState.snakeSegSize[1]
  ) {
    console.log(snakeState);
    console.log(canvasState);
    console.log(snakeBody);
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

  drawBoard(ctx.canvas, canvasState);
  // snakeState.moveSnake(5, 4);
  ctx.beginPath();
  ctx.fillStyle = `rgb(${Math.round(Math.random() * 255)},0,255)`;
  ctx.lineWidth = snakeState.snakeSegSize[0];
  ctx.lineJoin = 'round';
  ctx.moveTo(snakeBody!.coord[0], snakeBody!.coord[1]);
  snakeBody = snakeBody!.next;
  // while (snakeBody) {
  //   // ctx.fillRect(
  //   //   snakeBody!.coord[0],
  //   //   snakeBody!.coord[1],
  //   //   snakeState.snakeSegSize[0],
  //   //   snakeState.snakeSegSize[1]
  //   // );
  //   ctx.lineTo(snakeBody!.coord[0], snakeBody!.coord[1]);
  //   snakeBody = snakeBody!.next;
  // }
  ctx.stroke();
  ctx.closePath();
}

/** NAMED EVENT FUNCTIONS **/
//todo: Need to figure out a way to get window to resize
function resize(canvasState: CanvasState) {
  const size = window.innerWidth;
  console.log(size);
  if (size >= 500) {
    canvasState.height = 500;
    canvasState.width = 500;
  } else if (size >= 400) {
    canvasState.height = 400;
    canvasState.width = 400;
  } else if (size >= 300) {
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
