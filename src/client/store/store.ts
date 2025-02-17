import { userState } from "./user/user";
import { Store } from "../types/types";
import { snakeState } from "./snake/snake";
import { boardGameState } from "./boardGame/boardGameState";
import { canvasState } from "./canvasState/canvasState";
import scoreboard from "./scoreboard/scoreboard";
import { globalScores } from "./scoreboard/globalScores";

export default function createAppState(): Store {
  console.log(globalScores.isOpen.value);
  return {
    user: userState,
    snake: snakeState,
    boardGame: boardGameState,
    canvasState: canvasState,
    scoreboard,
    globalScores,
  };
}
