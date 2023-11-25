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
      this.snakeBody.last!.head = newSeg;
    }
  }

  moveSnake(x_coord: number, y_coord: number) {
    let tempCoord = this.snakeBody.coord;
    let nextBody = this.snakeBody.next;
    this.snakeBody.coord = [x_coord, y_coord];
    while (nextBody) {
      nextBody.coord = tempCoord;
      nextBody = nextBody.next;
      tempCoord = nextBody!.coord;
    }
  }

  /**
   * This function checks if the head of the snake collided with its body.
   * Returns true if it has collided and false if it did not collide
   * @param x_coord x coord of head
   * @param y_coord y coord of head
   * @returns boolean
   */
  checkSnakeBodyCollision(x_coord: number, y_coord: number): boolean {
    let nextBody = this.snakeBody.next;
    while (nextBody) {
      if (nextBody.coord[0] === x_coord && nextBody.coord[1] === y_coord) {
        return true;
      }
      nextBody = nextBody.next;
    }
    return false;
  }

  restart() {
    this.snakeBody = {
      next: null,
      last: null,
      coord: [0, 0]
    };

    this.snakeSegSize = [0, 0];
  }
}
