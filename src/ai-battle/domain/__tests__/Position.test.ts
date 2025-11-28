import { describe, it, expect } from 'vitest';
import { Position } from '../Position';

describe('Position', () => {
  describe('constructor', () => {
    it('should create a position with given x and y coordinates', () => {
      const position = new Position(5, 10);

      expect(position.x).toBe(5);
      expect(position.y).toBe(10);
    });

    it('should allow negative coordinates', () => {
      const position = new Position(-3, -7);

      expect(position.x).toBe(-3);
      expect(position.y).toBe(-7);
    });

    it('should allow zero coordinates', () => {
      const position = new Position(0, 0);

      expect(position.x).toBe(0);
      expect(position.y).toBe(0);
    });
  });

  describe('equals', () => {
    it('should return true when positions have the same coordinates', () => {
      const position1 = new Position(5, 10);
      const position2 = new Position(5, 10);

      expect(position1.equals(position2)).toBe(true);
    });

    it('should return false when x coordinates differ', () => {
      const position1 = new Position(5, 10);
      const position2 = new Position(6, 10);

      expect(position1.equals(position2)).toBe(false);
    });

    it('should return false when y coordinates differ', () => {
      const position1 = new Position(5, 10);
      const position2 = new Position(5, 11);

      expect(position1.equals(position2)).toBe(false);
    });

    it('should return false when both coordinates differ', () => {
      const position1 = new Position(5, 10);
      const position2 = new Position(6, 11);

      expect(position1.equals(position2)).toBe(false);
    });

    it('should return true when both positions are at origin', () => {
      const position1 = new Position(0, 0);
      const position2 = new Position(0, 0);

      expect(position1.equals(position2)).toBe(true);
    });
  });

  describe('toString', () => {
    it('should return a string representation of the position', () => {
      const position = new Position(5, 10);

      expect(position.toString()).toBe('Position(5, 10)');
    });
  });
});
