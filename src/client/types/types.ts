/* eslint-disable @typescript-eslint/no-unused-vars */
import { Signal } from '@preact/signals';
import Snake from '../store/snake/snake';
import BoardGame from '../store/boardGame/boardGameState';
import CanvasState from '../store/canvasState/canvasState';

//Store (is it needed?)
export type Store = {
  user: Signal<User | null>;
  snake: Signal<Snake | null>;
  boardGame: Signal<BoardGame | null>;
  canvasState: Signal<CanvasState>;
};

// Start Page
export type User = {
  id: number;
  username: string;
  password?: string | null;
  highScore: number;
};

type ScoreBoard = {
  scores: User[];
};

//Snake Game
