/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { SnakeBody } from '../../types/boardgame';
import GameBoard, {
  boardGameState
} from '../../store/boardGame/boardGameState';
import { AppState } from '../../main';
import Snake from '../../store/snake/snake';
import CanvasState from '../../store/canvasState/canvasState';
import BoardGameState from '../../store/boardGame/boardGameState';
import scoreboardType from '../../store/scoreboard/scoreboard';

type Props = {
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

//Todo: Need to open input when user is in mobile
export default function BoardGame(props: Props) {
  const {
    snake: snakeState,
    boardGame: boardGameState,
    canvasState,
    scoreboard
  } = useContext(AppState);
  const [canvasSize, setCanvasSize] = useState<number[]>([0, 0]);
  const boardGameRef: React.Ref<HTMLCanvasElement> = useRef(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const cancelAnimationReturn = useRef<number>(0);

  function animateSnake(timeStamp: number) {
    if (
      timeStamp === 0 ||
      timeStamp - canvasState.value.lastTime > snakeState.value!.velocity
    ) {
      canvasState.value.canAcceptKeyDown = true;
      if (
        !setSnake(
          canvasState.value,
          ctx.current!,
          snakeState.value!,
          boardGameState.value
        )
      ) {
        return resetGame(
          cancelAnimationReturn.current,
          props.setHasGameStarted,
          scoreboard
        );
      }
      canvasState.value.lastTime = timeStamp;
    }
    cancelAnimationReturn.current = window.requestAnimationFrame(animateSnake);
    //check board collision might move to board State
    if (
      snakeState.value.snakeBody.coord[0] <=
        -snakeState.value.snakeSegSize[0] ||
      snakeState.value.snakeBody.coord[0] >= canvasState.value.width ||
      snakeState.value.snakeBody.coord[1] <=
        -snakeState.value.snakeSegSize[1] ||
      snakeState.value.snakeBody.coord[1] >= canvasState.value.height
    ) {
      resetGame(
        cancelAnimationReturn.current,
        props.setHasGameStarted,
        scoreboard
      );
    }
  }

  function handleUserInput(e: KeyboardEvent) {
    e.preventDefault();
    if (
      canvasState.value.currentTime - canvasState.value.lastTime <=
      snakeState.value!.velocity
    ) {
      onKeyDown(e, snakeState.value!, canvasState.value);
    }
  }

  //useLayoutEffect to instantiate the canvas
  useLayoutEffect(() => {
    if (boardGameRef?.current) {
      canvasState.value.resize();

      snakeState.value = new Snake(
        4,
        [canvasState.value.width / 2, canvasState.value.height / 2],
        [canvasState.value.width / 20, canvasState.value.height / 20]
      );

      boardGameState.value = new BoardGameState([
        canvasState.value.width,
        canvasState.value.height
      ]);

      boardGameState.value?.createFood(snakeState.value!);
      //make this x,y coords
      setCanvasSize([canvasState.value.width, canvasState.value.height]);
      ctx.current = drawBoard(
        boardGameRef.current,
        canvasState.value,
        boardGameState.value!,
        snakeState.value!
      );

      animateSnake(0);
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
  canvasState: CanvasState,
  boardGameState: BoardGameState | null,
  snakeState: Snake
) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(165,165,165)';
    ctx.fillRect(0, 0, canvasState.width, canvasState.height);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(
      boardGameState!.foodCoord[0],
      boardGameState!.foodCoord[1],
      snakeState.snakeSegSize[0],
      snakeState.snakeSegSize[1]
    );
  }
  return ctx;
}

function drawSnake(ctx: CanvasRenderingContext2D, snakeState: Snake) {
  let snakeBody: SnakeBody | null = snakeState.snakeBody;
  while (snakeBody) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.fillRect(
      snakeBody.coord[0],
      snakeBody.coord[1],
      snakeState.snakeSegSize[0],
      snakeState.snakeSegSize[1]
    );
    snakeBody = snakeBody!.next;
  }

  ctx.closePath();
}
//split this out
function setSnake(
  canvasState: CanvasState,
  ctx: CanvasRenderingContext2D,
  snakeState: Snake,
  boardGameState: BoardGameState
) {
  let snakeBody: SnakeBody | null = snakeState.snakeBody;
  const lastSnakeBody: [number, number] = [...snakeBody.last!.coord];
  const nextCoords = snakeState.getNextSnakeCoord();
  if (snakeState.checkSnakeBodyCollision(...nextCoords)) {
    return false;
  }
  snakeState.moveSnake(...nextCoords);
  drawBoard(ctx.canvas, canvasState, boardGameState, snakeState);
  drawSnake(ctx, snakeState);

  if (
    snakeBody.coord[0] === boardGameState.foodCoord[0] &&
    snakeBody.coord[1] === boardGameState.foodCoord[1]
  ) {
    snakeState.addSnakeBody(...lastSnakeBody);
    boardGameState.createFood(snakeState);
  }
  return true;
}

/** NAMED EVENT FUNCTIONS **/
//todo: Need to figure out a way to get window to resize

function onKeyDown(
  e: KeyboardEvent,
  snakeState: Snake,
  canvasState: CanvasState
) {
  if (!canvasState.canAcceptKeyDown) {
    return;
  }

  switch (e.key) {
    case 'W':
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
  canvasState.canAcceptKeyDown = false;
}

function resetGame(
  cancelAnimation: number,
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
  scoreboard: typeof scoreboardType
) {
  /**
   * The reason why the upper limit is the max width is because the coords start from left
   * and then fill to the right. Same for the height
   */

  window.cancelAnimationFrame(cancelAnimation);
  clearInterval(scoreboard.intervalId);
  scoreboard.intervalId = 0;
  //make modal and play again?
  setHasGameStarted(false);
}
