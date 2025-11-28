export type Direction = 'N' | 'S' | 'E' | 'W';

export interface IPosition {
  x: number;
  y: number;
}

export interface ExecutionResult {
  position: IPosition;
  direction: Direction;
  status: 'success' | 'obstacle-detected';
  positionHistory: IPosition[];
  obstaclePosition?: IPosition;
}
