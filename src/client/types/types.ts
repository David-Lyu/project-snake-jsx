/* eslint-disable @typescript-eslint/no-unused-vars */
import { Signal } from '@preact/signals';

//Store (is it needed?)
export type Store = {
  user: Signal<User | null>;
};

// Start Page
export type User = {
  id: number;
  username: string;
  password?: string | null;
  highscore: number;
};

type ScoreBoard = {
  scores: User[];
};

//Snake Game
