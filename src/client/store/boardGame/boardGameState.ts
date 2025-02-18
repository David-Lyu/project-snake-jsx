import { Signal, signal } from "@preact/signals-react";
import Snake, { snakeState } from "../snake/snake";
import { Dimension } from "../../types/types";

export default class BoardGameState {
  //create x,y cooord type
  dimensions: Dimension = [0, 0];
  foodCoord: Dimension = [0, 0];
  snakePoints: number = 50;
  constructor(dimensions: Dimension = [10, 10]) {
    this.dimensions = dimensions;
  }

  createFood(snake: Snake) {
    const x_coord =
      Math.round(
        Math.random() *
          ((this.dimensions[0] - snakeState.value!.snakeSegSize[0]) /
            snakeState.value!.snakeSegSize[0]),
      ) * snakeState.value!.snakeSegSize[0];
    const y_coord =
      Math.round(
        Math.random() *
          ((this.dimensions[0] - snakeState.value!.snakeSegSize[0]) /
            snakeState.value!.snakeSegSize[1]),
      ) * snakeState.value!.snakeSegSize[1];

    //might move to its own method or make it a while loop.
    //if keeping recursion then need to cache coords when snake gets too big,
    //and then delete the last node coords from the cache before moving the snake
    if (
      snake.checkSnakeBodyCollision(x_coord, y_coord) ||
      (snake.snakeBody.coord[0] === x_coord &&
        snake.snakeBody.coord[1] === y_coord)
    ) {
      this.createFood(snake);
    } else {
      this.foodCoord = [x_coord, y_coord];
    }
  }
}

export const boardGameState: Signal<BoardGameState> = signal(
  new BoardGameState(),
);
