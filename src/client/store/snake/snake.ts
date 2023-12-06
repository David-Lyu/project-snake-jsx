import { Signal, signal } from '@preact/signals';
import { SnakeBody } from '../../types/boardgame';

export const snakeState: Signal<Snake | null> = signal(null);

export default class Snake {
  snakeBody: SnakeBody = {
    next: null,
    last: null,
    coord: [0, 0]
  };

  snakeSegSize = [10, 10];
  direction: 'left' | 'right' | 'up' | 'down' = 'left';
  velocity: number = 0;

  constructor(
    snakeSize: number = 3,
    startCoords: number[] = [0, 0],
    snakeDimensions: number[] = [10, 10],
    direction: 'left' | 'right' | 'up' | 'down' = 'left'
  ) {
    this.snakeBody.coord = startCoords;
    this.snakeSegSize = snakeDimensions;
    this.direction = direction;
    //60 fps so if you want it to move one snake segment per second divide by 60
    this.velocity = this.snakeSegSize[0] / 60;

    this.initSnake(snakeSize);
  }

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
    let prevCoord = this.snakeBody.coord;
    let nextCoord = null;
    let nextBody = this.snakeBody.next;
    this.snakeBody.coord = [x_coord, y_coord];
    if (nextBody) {
      nextCoord = nextBody.next;
      //need to work on the logic
      while (nextBody.next) {
        nextCoord = nextBody.coord;
        nextBody.coord = prevCoord;
        nextBody = nextBody.next;
        prevCoord = nextCoord;
      }
      nextBody.coord = prevCoord;
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

  initSnake(snakeSize: number) {
    let tempSnake = this.snakeBody;

    if (snakeSize > 10) {
      snakeSize = 3;
    }
    while (snakeSize) {
      tempSnake.next = {
        next: null,
        last: null,
        coord: [tempSnake.coord[0] + this.snakeSegSize[0], tempSnake.coord[1]]
      };
      tempSnake = tempSnake.next;
      snakeSize--;
    }
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
