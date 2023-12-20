import { Signal, signal } from '@preact/signals';
import { SnakeBody } from '../../types/boardgame';
import BoardGameState from '../boardGame/boardGameState';

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
    startCoords: [number, number] = [0, 0],
    snakeDimensions: number[] = [10, 10],
    direction: 'left' | 'right' | 'up' | 'down' = 'left'
  ) {
    this.snakeBody.coord = startCoords;
    this.snakeSegSize = snakeDimensions;
    this.direction = direction;
    //60 fps so if you want it to move one snake segment per second divide by 60
    this.velocity = 600;

    this.initSnake(snakeSize);
  }

  /**
   * This function should get the new x,y coordinate to add the head.
   * It should be pre calculated on where it should be
   * @param x_coord the x-axis to add the new head
   * @param y_coord the y-axis to add the new head
   */
  addSnakeBody(x_coord: number, y_coord: number) {
    this.velocity -= this.velocity >= 50 ? this.snakeSegSize[0] / (5 ^ 0.5) : 0;
    if (this.snakeBody.last) {
      const newSeg: SnakeBody = {
        next: null,
        last: null,
        coord: [x_coord, y_coord]
      };

      this.snakeBody.last.next = newSeg;
      this.snakeBody.last = newSeg;
    }
  }

  moveSnake(x_coord: number, y_coord: number) {
    let prevCoord = this.snakeBody.coord;
    let nextCoord = null;
    let nextBody = this.snakeBody.next;
    this.snakeBody.coord = [x_coord, y_coord];
    if (nextBody) {
      nextCoord = nextBody.next;

      while (nextBody.next) {
        nextCoord = nextBody.coord;
        nextBody.coord = prevCoord;

        nextBody = nextBody.next;
        prevCoord = nextCoord;
      }
      nextBody.coord = prevCoord;
      this.snakeBody.last = nextBody;
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
      console.log('checkSnakeBody');
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
    while (--snakeSize) {
      tempSnake.next = {
        next: null,
        last: null,
        coord: [tempSnake.coord[0] + this.snakeSegSize[0], tempSnake.coord[1]]
      };
      //add the last snake
      if (snakeSize === 1) this.snakeBody.last = tempSnake;
      tempSnake = tempSnake.next;
    }
  }

  getNextSnakeCoord(
    boardGameState: BoardGameState,
    isFoodEaten: boolean = false
  ): [number, number] {
    switch (this.direction) {
      case 'up':
        if (isFoodEaten && this.snakeBody.coord[1] - this.snakeSegSize[1] < 0) {
          return [this.handleYAxisEdge(), this.snakeBody.coord[1]];
        } else {
          return [
            this.snakeBody.coord[0],
            this.snakeBody.coord[1] - this.snakeSegSize[1]
          ];
        }
      case 'down':
        if (
          isFoodEaten &&
          this.snakeBody.coord[1] + this.snakeSegSize[1] >
            boardGameState.dimensions[1] - this.snakeSegSize[1]
        ) {
          return [this.handleYAxisEdge(), this.snakeBody.coord[1]];
        } else {
          return [
            this.snakeBody.coord[0],
            this.snakeBody.coord[1] + this.snakeSegSize[1]
          ];
        }
      case 'left':
        if (isFoodEaten && this.snakeBody.coord[0] - this.snakeSegSize[0] < 0) {
          return [this.snakeBody.coord[0], this.handleXAxisEdge()];
        } else {
          return [
            this.snakeBody.coord[0] - this.snakeSegSize[0],
            this.snakeBody.coord[1]
          ];
        }
      case 'right':
        if (
          isFoodEaten &&
          this.snakeBody.coord[0] + this.snakeSegSize[0] >
            boardGameState.dimensions[0] - this.snakeSegSize[0]
        ) {
          return [this.snakeBody.coord[0], this.handleXAxisEdge()];
        } else {
          return [
            this.snakeBody.coord[0] + this.snakeSegSize[0],
            this.snakeBody.coord[1]
          ];
        }
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

  //helper functions
  handleYAxisEdge() {
    if (this.snakeBody.coord[0] <= 0) {
      this.direction = 'right';
      return this.snakeBody.coord[0] + this.snakeSegSize[0];
    } else {
      this.direction = 'left';
      return this.snakeBody.coord[0] - this.snakeSegSize[0];
    }
  }

  handleXAxisEdge() {
    if (this.snakeBody.coord[1] <= 0) {
      this.direction = 'down';
      return this.snakeBody.coord[1] + this.snakeSegSize[1];
    } else {
      this.direction = 'up';
      return this.snakeBody.coord[1] - this.snakeSegSize[1];
    }
  }
}
