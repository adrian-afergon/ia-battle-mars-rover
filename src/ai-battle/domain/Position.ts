import { IPosition } from './types/index';

/**
 * Represents a position in a 2D coordinate system.
 * @class Position
 */
export class Position implements IPosition {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  /**
   * Compares this position with another position.
   * @param other The other position to compare with
   * @returns true if both positions have the same x and y coordinates
   */
  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Returns a string representation of the position.
   */
  toString(): string {
    return `Position(${this.x}, ${this.y})`;
  }
}
