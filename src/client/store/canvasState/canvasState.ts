import { signal } from "@preact/signals-react";

export default class CanvasState {
  width: number = 0;
  height: number = 0;
  grid: number[] = [];
  canAcceptKeyDown: boolean = false;
  lastTime: number = 0;
  currentTime: number = 0;
  cancelAnimationFrame = 0;
  constructor() {}

  resize() {
    const size = window.innerWidth;
    if (size >= 500) {
      this.height = 500;
      this.width = 500;
    } else if (size >= 400) {
      this.height = 400;
      this.width = 400;
    } else if (size >= 300) {
      this.height = 300;
      this.width = 300;
    } else {
      this.height = 200;
      this.width = 200;
    }
  }
}

export const canvasState = signal(new CanvasState());
