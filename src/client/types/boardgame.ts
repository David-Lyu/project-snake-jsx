// export type CanvasReactState = CanvasRenderingContext2D | null;
// export type CanvasReactSetState = React.Dispatch<
//   React.SetStateAction<CanvasRenderingContext2D | null>
// >;

export type CanvasState = {
  width: number;
  height: number;
  grid: number[];
  hasStarted: boolean;
};

//linkedList
export type SnakeBody = {
  head?: SnakeBody;
  next: SnakeBody | null;
  last: SnakeBody | null;
  coord: number[];
};
