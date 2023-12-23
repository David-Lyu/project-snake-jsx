/* eslint-disable @typescript-eslint/no-unused-vars */
import { Signal } from '@preact/signals';
import Snake from '../store/snake/snake';
import BoardGame from '../store/boardGame/boardGameState';
import CanvasState from '../store/canvasState/canvasState';
import scoreboard from '../store/scoreboard/scoreboard';

//Store (is it needed?)
export type Store = {
  user: Signal<User | null>;
  snake: Signal<Snake>;
  boardGame: Signal<BoardGame>;
  canvasState: Signal<CanvasState>;
  scoreboard: typeof scoreboard;
};

// Start Page
export type User = {
  id: number;
  username: string;
  password?: string | null;
  highScore: number;
};

export type Dimension = [number, number];

type ScoreBoard = {
  scores: User[];
};

//Snake Game
