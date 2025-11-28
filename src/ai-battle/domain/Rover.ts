import { Position } from './Position';
import { WorldMap } from './WorldMap';
import { Direction, IPosition, ExecutionResult } from './types/index';

/**
 * Represents the Mars Rover.
 * @class Rover
 */
export class Rover {
  private currentPosition: Position;
  private currentDirection: Direction;
  private positionHistory: Position[] = [];

  /**
   * Creates a new Rover instance.
   * @param position The initial position of the rover
   * @param direction The initial direction the rover is facing
   * @param worldMap The world map the rover operates on
   */
  constructor(
    position: IPosition,
    direction: Direction,
    private worldMap: WorldMap,
  ) {
    this.currentPosition = new Position(position.x, position.y);
    this.currentDirection = direction;
    this.positionHistory = [new Position(position.x, position.y)];
  }

  /**
   * Gets the current position of the rover.
   */
  getPosition(): IPosition {
    return {
      x: this.currentPosition.x,
      y: this.currentPosition.y,
    };
  }

  /**
   * Gets the current direction the rover is facing.
   */
  getDirection(): Direction {
    return this.currentDirection;
  }

  /**
   * Executes a sequence of commands.
   * @param commands A string of commands (f, b, l, r)
   * @returns ExecutionResult with final position, direction, and status
   */
  execute(commands: string): ExecutionResult {
    for (const command of commands) {
      if (command === 'l') {
        this.turnLeft();
      } else if (command === 'r') {
        this.turnRight();
      } else if (command === 'f') {
        const canMove = this.moveForward();
        if (!canMove) {
          return this.createObstacleResult();
        }
      } else if (command === 'b') {
        const canMove = this.moveBackward();
        if (!canMove) {
          return this.createObstacleResult();
        }
      }
    }

    return this.createSuccessResult();
  }

  /**
   * Turns the rover left (counter-clockwise).
   * @private
   */
  private turnLeft(): void {
    const leftTurns: Record<Direction, Direction> = {
      N: 'W',
      W: 'S',
      S: 'E',
      E: 'N',
    };
    this.currentDirection = leftTurns[this.currentDirection];
  }

  /**
   * Turns the rover right (clockwise).
   * @private
   */
  private turnRight(): void {
    const rightTurns: Record<Direction, Direction> = {
      N: 'E',
      E: 'S',
      S: 'W',
      W: 'N',
    };
    this.currentDirection = rightTurns[this.currentDirection];
  }

  /**
   * Moves the rover forward in its current direction.
   * @private
   * @returns true if move was successful, false if obstacle was detected
   */
  private moveForward(): boolean {
    const nextPosition = this.getNextPosition(true);

    if (!this.worldMap.isValidPosition(nextPosition) || this.worldMap.hasObstacle(nextPosition)) {
      return false;
    }

    this.currentPosition = nextPosition;
    this.positionHistory.push(new Position(nextPosition.x, nextPosition.y));
    return true;
  }

  /**
   * Moves the rover backward (opposite to its current direction).
   * @private
   * @returns true if move was successful, false if obstacle was detected
   */
  private moveBackward(): boolean {
    const nextPosition = this.getNextPosition(false);

    if (!this.worldMap.isValidPosition(nextPosition) || this.worldMap.hasObstacle(nextPosition)) {
      return false;
    }

    this.currentPosition = nextPosition;
    this.positionHistory.push(new Position(nextPosition.x, nextPosition.y));
    return true;
  }

  /**
   * Calculates the next position based on the current direction and movement type.
   * @private
   * @param forward true to move forward, false to move backward
   * @returns The next position
   */
  private getNextPosition(forward: boolean): Position {
    const directionMap: Record<Direction, { dx: number; dy: number }> = {
      N: { dx: 0, dy: 1 },
      S: { dx: 0, dy: -1 },
      E: { dx: 1, dy: 0 },
      W: { dx: -1, dy: 0 },
    };

    const { dx, dy } = directionMap[this.currentDirection];
    const multiplier = forward ? 1 : -1;

    return new Position(this.currentPosition.x + dx * multiplier, this.currentPosition.y + dy * multiplier);
  }

  /**
   * Creates a successful execution result.
   * @private
   */
  private createSuccessResult(): ExecutionResult {
    return {
      position: { x: this.currentPosition.x, y: this.currentPosition.y },
      direction: this.currentDirection,
      status: 'success',
      positionHistory: this.positionHistory.map(p => ({ x: p.x, y: p.y })),
    };
  }

  /**
   * Creates an obstacle detected execution result.
   * @private
   */
  private createObstacleResult(): ExecutionResult {
    const obstaclePosition = this.getNextPosition(this.currentDirection === this.currentDirection);

    return {
      position: { x: this.currentPosition.x, y: this.currentPosition.y },
      direction: this.currentDirection,
      status: 'obstacle-detected',
      positionHistory: this.positionHistory.map(p => ({ x: p.x, y: p.y })),
      obstaclePosition: { x: obstaclePosition.x, y: obstaclePosition.y },
    };
  }
}
