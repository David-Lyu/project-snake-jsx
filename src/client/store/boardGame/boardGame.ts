import Snake from '../snake/snake';

export default class BoardGame {
  dimensions: number[] = [];
  foodCoord: number[] = [0, 0];
  constructor(dimensions = [10, 10]) {
    this.dimensions = dimensions;
  }

  createFood(snake: Snake) {
    const x_coord = Math.round(Math.random()) * 10;
    const y_coord = Math.round(Math.random()) * 10;

    //might move to its own method
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
