import { userState } from './user/user';
import { Store } from '../types/types';
import { snakeState } from './snake/snake';
import { boardGameState } from './boardGame/boardGame';

export default function createAppState(): Store {
  return {
    user: userState,
    snake: snakeState,
    boardGame: boardGameState
  };
}
