import { SnakeBody } from '../../types/boardgame';

export default class Snake {
  snakeBody: SnakeBody = {
    next: null,
    last: null,
    coord: [0, 0]
  };

  snakeSegSize = [0, 0];

  constructor() {}

  /**
   * This function should get the new x,y coordinate to add the head.
   * It should be pre calculated on where it should be
   * @param x_coord the x-axis to add the new head
   * @param y_coord the y-axis to add the new head
   */
  addSnakeBody(x_coord: number, y_coord: number) {
    if (!this.snakeBody.last) {
      const newSeg: SnakeBody = {
        next: this.snakeBody,
        last: this.snakeBody.last,
        coord: [x_coord, y_coord]
      };

      this.snakeBody = newSeg;
    }
  }
}
