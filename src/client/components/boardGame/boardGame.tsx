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

//need to move out with startGameModal
type Props = {
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

//Todo: Need to open input when user is in mobile
export default function BoardGame(props: Props) {
  const {
    snake: snakeState,
    boardGame: boardGameState,
    canvasState
  } = useContext(AppState);
  const [canvasSize, setCanvasSize] = useState<number[]>([0, 0]);
  const boardGameRef: React.Ref<HTMLCanvasElement> = useRef(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const cancelAnimationReturn = useRef<number>(0);
  /**this should be ref or signal since last time and currentTime and
   * canAcceptKeyDown are reactive, but since logic is happening in the
   * canvas react component is not re rendering. In the future if something
   * causes re-rendering then this needs to change
   *
   */
  // const canvasState: CanvasState = {
  //   width: 0,
  //   height: 0,
  //   grid: [10, 10],
  //   canAcceptKeyDown: false,
  //   lastTime: 0,
  //   currentTime: 0
  // };

  function animateSnake(timeStamp: number) {
    //has to be first to cancel request Animation needs to be set before calling draw snake
    if (
      timeStamp === 0 ||
      timeStamp - canvasState.value.lastTime > snakeState.value!.velocity
    ) {
      console.log(snakeState.value?.velocity);
      canvasState.value.canAcceptKeyDown = true;
      drawSnake(
        canvasState.value,
        ctx.current!,
        snakeState.value!,
        boardGameState.value!
      );
      let snakeBody: SnakeBody | null = snakeState.value!.snakeBody;
      while (snakeBody) {
        ctx.current!.beginPath();
        ctx.current!.fillStyle = 'green';
        ctx.current!.fillRect(
          snakeBody!.coord[0],
          snakeBody!.coord[1],
          snakeState.value!.snakeSegSize[0],
          snakeState.value!.snakeSegSize[1]
        );
        snakeBody = snakeBody!.next;
      }

      ctx.current!.closePath();
      // console.log('snake coords');
      // console.log(snakeState.value?.snakeBody.coord[0]);
      // console.log(snakeState.value?.snakeBody.coord[1]);
      canvasState.value.lastTime = timeStamp;
    }
    cancelAnimationReturn.current = window.requestAnimationFrame(animateSnake);
    resetGame(
      cancelAnimationReturn.current,
      snakeState.value!,
      canvasState.value,
      props.setHasGameStarted
    );
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
    console.log('inside layout effect');
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

function drawSnake(
  canvasState: CanvasState,
  ctx: CanvasRenderingContext2D,
  snakeState: Snake,
  boardGameState: BoardGameState
) {
  console.log('draw snake');
  let snakeBody: SnakeBody | null = snakeState.snakeBody;
  snakeState.moveSnake(...snakeState.getNextSnakeCoord(boardGameState));

  if (
    snakeBody.coord[0] === boardGameState.foodCoord[0] &&
    snakeBody.coord[1] === boardGameState.foodCoord[1]
  ) {
    snakeState.addSnakeBody(
      ...snakeState.getNextSnakeCoord(boardGameState, true)
    );
    boardGameState.createFood(snakeState);
  }

  drawBoard(ctx.canvas, canvasState, boardGameState, snakeState);
  /** When using image we want to take head logic out and make the while loop for body */
  // while (snakeBody) {
  //   ctx.beginPath();
  //   ctx.fillStyle = 'green';
  //   ctx.fillRect(
  //     snakeBody!.coord[0],
  //     snakeBody!.coord[1],
  //     snakeState.snakeSegSize[0],
  //     snakeState.snakeSegSize[1]
  //   );
  //   snakeBody = snakeBody!.next;
  // }

  // ctx.closePath();
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
  snakeState: Snake,
  canvasState: CanvasState,
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>
) {
  /**
   * The reason why the upper limit is the max width is because the coords start from left
   * and then fill to the right. Same for the height
   */
  if (
    snakeState.snakeBody.coord[0] <= -snakeState.snakeSegSize[0] ||
    snakeState.snakeBody.coord[0] >= canvasState.width ||
    snakeState.snakeBody.coord[1] <= -snakeState.snakeSegSize[1] ||
    snakeState.snakeBody.coord[1] >= canvasState.height
  ) {
    window.cancelAnimationFrame(cancelAnimation);
    //make modal and play again?
    setHasGameStarted(false);
  }
}
