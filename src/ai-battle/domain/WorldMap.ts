import { Position } from './Position';
import { IPosition } from './types/index';

/**
 * Represents the world map for the Mars Rover.
 * Handles boundaries and obstacle detection.
 * @class WorldMap
 */
export class WorldMap {
  private obstacles: Set<string> = new Set();

  /**
   * Creates a new WorldMap instance.
   * @param width The width of the map
   * @param height The height of the map
   * @param obstacles Optional array of obstacle positions
   */
  constructor(
    public readonly width: number,
    public readonly height: number,
    obstacles: IPosition[] = [],
  ) {
    this.obstacles = new Set(obstacles.map(obs => this.positionToKey(obs.x, obs.y)));
  }

  /**
   * Checks if a position is valid (within map boundaries).
   * @param position The position to check
   * @returns true if the position is within the map boundaries
   */
  isValidPosition(position: Position): boolean {
    return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;
  }

  /**
   * Checks if a position has an obstacle.
   * @param position The position to check
   * @returns true if there is an obstacle at the position
   */
  hasObstacle(position: Position): boolean {
    const key = this.positionToKey(position.x, position.y);
    return this.obstacles.has(key);
  }

  /**
   * Wraps a position around the map edges or returns the same position if it hits a boundary.
   * This simulates a flat planet where edges are impassable.
   * @param position The position to wrap
   * @returns The wrapped position or the original position if it's out of bounds
   */
  wrapPosition(position: Position): Position {
    const isOutOfBounds =
      position.x < 0 || position.x >= this.width || position.y < 0 || position.y >= this.height;

    if (isOutOfBounds) {
      return position;
    }

    return position;
  }

  /**
   * Converts x, y coordinates to a string key for obstacle storage.
   * @private
   */
  private positionToKey(x: number, y: number): string {
    return `${x},${y}`;
  }
}
