/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { SnakeBody } from '../../types/boardgame';
import { AppState } from '../../main';
import Snake, { snakeState } from '../../store/snake/snake';
import CanvasState, { canvasState } from '../../store/canvasState/canvasState';
import BoardGameState, {
  boardGameState
} from '../../store/boardGame/boardGameState';
import scoreboardState from '../../store/scoreboard/scoreboard';
import Joystick from '../joystick/Joystick';
import LocalStorageAdapter from '../../modules/localStorage';

type Props = {
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

//Used in joystick need to refactor
type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

//Grab singleton for adapter
const localStorage = LocalStorageAdapter.GetInstance()

//Todo: Need to open input when user is in mobile
export default function BoardGame(props: Props) {
  const {
    snake: snakeState,
    boardGame: boardGameState,
    canvasState
  } = useContext(AppState);
  const [canvasSize, setCanvasSize] = useState<number[]>([0, 0]);
  const [direction, setDirection] = useState<Direction>('ArrowLeft');
  const boardGameRef: React.Ref<HTMLCanvasElement> = useRef(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  function animateSnake(timeStamp: number) {
    if (
      timeStamp === 0 ||
      timeStamp - canvasState.value.lastTime > snakeState.value!.velocity
    ) {
      canvasState.value.canAcceptKeyDown = true;
      if (!setSnake(ctx.current!)) {
        return resetGame(
          canvasState.value.cancelAnimationFrame,
          props.setHasGameStarted
        );
      }
      canvasState.value.lastTime = timeStamp;
    }
    //move this to state
    canvasState.value.cancelAnimationFrame =
      window.requestAnimationFrame(animateSnake);
    /**
     * The reason why the upper limit is the max width is because the coords start from left
     * and then fill to the right. Same for the height
     */
    if (
      snakeState.value.snakeBody.coord[0] <=
      -snakeState.value.snakeSegSize[0] ||
      snakeState.value.snakeBody.coord[0] >= canvasState.value.width ||
      snakeState.value.snakeBody.coord[1] <=
      -snakeState.value.snakeSegSize[1] ||
      snakeState.value.snakeBody.coord[1] >= canvasState.value.height
    ) {
      resetGame(
        canvasState.value.cancelAnimationFrame,
        props.setHasGameStarted
      );
    }
  }

  function handleUserInput(e: KeyboardEvent) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (
      canvasState.value.currentTime - canvasState.value.lastTime <=
      snakeState.value!.velocity
    ) {
      onKeyDown(e, snakeState.value!, canvasState.value);
    }
  }

  //useLayoutEffect to instantiate the canvas //need to pass in hasGameStarted, and then draw.
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
      ctx.current = drawBoard(boardGameRef.current);

      animateSnake(0);
      window.addEventListener('keydown', handleUserInput);

      return () => {
        window.cancelAnimationFrame(canvasState.value.cancelAnimationFrame);
        window.removeEventListener('keydown', handleUserInput);
      };
    }
  }, [boardGameRef]);

  //need to refactor handleUserInput more elegantly
  useEffect(() => {
    const pseudoEvent = { key: direction };
    handleUserInput(pseudoEvent as KeyboardEvent);
  }, [direction]);

  useEffect(() => {
    scoreboardState.highScore.value = localStorage.getHighscore();
  }, [])
  return (
    <section className="boardgame-container">
      <canvas ref={boardGameRef} width={canvasSize[0]} height={canvasSize[1]}>
        No Game Available
      </canvas>
      <Joystick setDirection={setDirection} />
    </section>
  );
}

/** HELPER FUNCTIONS **/

function drawBoard(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(165,165,165)';
    ctx.fillRect(0, 0, canvasState.value.width, canvasState.value.height);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(
      boardGameState.value.foodCoord[0],
      boardGameState.value.foodCoord[1],
      snakeState.value.snakeSegSize[0],
      snakeState.value.snakeSegSize[1]
    );
  }
  return ctx;
}

function drawSnake(ctx: CanvasRenderingContext2D) {
  let snakeBody: SnakeBody | null = snakeState.value.snakeBody;
  while (snakeBody) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.fillRect(
      snakeBody.coord[0],
      snakeBody.coord[1],
      snakeState.value.snakeSegSize[0],
      snakeState.value.snakeSegSize[1]
    );
    snakeBody = snakeBody!.next;
  }

  ctx.closePath();
}
//split this out
function setSnake(ctx: CanvasRenderingContext2D) {
  let snakeBody: SnakeBody | null = snakeState.value.snakeBody;
  const lastSnakeBody: [number, number] = [...snakeBody.last!.coord];
  const nextCoords = snakeState.value.getNextSnakeCoord();
  if (snakeState.value.checkSnakeBodyCollision(...nextCoords)) {
    return false;
  }
  snakeState.value.moveSnake(...nextCoords);
  drawBoard(ctx.canvas);
  drawSnake(ctx);

  if (
    snakeBody.coord[0] === boardGameState.value.foodCoord[0] &&
    snakeBody.coord[1] === boardGameState.value.foodCoord[1]
  ) {
    scoreboardState.score.value += boardGameState.value.snakePoints;
    localStorage.updateHighscore(scoreboardState.score.value)
    snakeState.value.addSnakeBody(...lastSnakeBody);
    boardGameState.value.createFood(snakeState.value);
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
    case 'w':
    case 'ArrowUp':
      if (snakeState.direction !== 'down') snakeState.direction = 'up';
      break;
    case 's':
    case 'ArrowDown':
      if (snakeState.direction !== 'up') snakeState.direction = 'down';
      break;
    case 'a':
    case 'ArrowLeft':
      if (snakeState.direction !== 'right') snakeState.direction = 'left';
      break;
    case 'd':
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
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>
) {
  window.cancelAnimationFrame(cancelAnimation);
  clearInterval(scoreboardState.intervalId);
  scoreboardState.intervalId = 0;
  //need to use local storage set and grab high score
  scoreboardState.score.value = 0;
  //make modal and play again?
  setHasGameStarted(false);
}
