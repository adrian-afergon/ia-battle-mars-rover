import { describe, it, expect } from 'vitest';
import { Rover } from '../Rover';
import { WorldMap } from '../WorldMap';
import { Position } from '../Position';

describe('Rover - Fase 2 (Basic)', () => {
  describe('constructor and getters', () => {
    it('should create a rover with initial position and direction', () => {
      const worldMap = new WorldMap(10, 10);
      const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

      expect(rover.getPosition()).toEqual({ x: 5, y: 5 });
      expect(rover.getDirection()).toBe('N');
    });

    it('should create a rover at origin', () => {
      const worldMap = new WorldMap(10, 10);
      const rover = new Rover({ x: 0, y: 0 }, 'E', worldMap);

      expect(rover.getPosition()).toEqual({ x: 0, y: 0 });
      expect(rover.getDirection()).toBe('E');
    });

    it('should support all directions', () => {
      const worldMap = new WorldMap(10, 10);

      const roverN = new Rover({ x: 5, y: 5 }, 'N', worldMap);
      const roverS = new Rover({ x: 5, y: 5 }, 'S', worldMap);
      const roverE = new Rover({ x: 5, y: 5 }, 'E', worldMap);
      const roverW = new Rover({ x: 5, y: 5 }, 'W', worldMap);

      expect(roverN.getDirection()).toBe('N');
      expect(roverS.getDirection()).toBe('S');
      expect(roverE.getDirection()).toBe('E');
      expect(roverW.getDirection()).toBe('W');
    });

    it('should initialize with position history', () => {
      const worldMap = new WorldMap(10, 10);
      const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);
      const result = rover.execute('');

      expect(result.positionHistory).toHaveLength(1);
      expect(result.positionHistory[0]).toEqual({ x: 5, y: 5 });
    });
  });

  describe('Fase 3: Rotation (L and R)', () => {
    describe('turn left (L)', () => {
      it('should turn left from North to West', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('l');

        expect(rover.getDirection()).toBe('W');
      });

      it('should turn left from West to South', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'W', worldMap);

        rover.execute('l');

        expect(rover.getDirection()).toBe('S');
      });

      it('should turn left from South to East', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'S', worldMap);

        rover.execute('l');

        expect(rover.getDirection()).toBe('E');
      });

      it('should turn left from East to North', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'E', worldMap);

        rover.execute('l');

        expect(rover.getDirection()).toBe('N');
      });

      it('should complete full rotation with left turns (N->W->S->E->N)', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('llll');

        expect(rover.getDirection()).toBe('N');
      });
    });

    describe('turn right (R)', () => {
      it('should turn right from North to East', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('r');

        expect(rover.getDirection()).toBe('E');
      });

      it('should turn right from East to South', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'E', worldMap);

        rover.execute('r');

        expect(rover.getDirection()).toBe('S');
      });

      it('should turn right from South to West', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'S', worldMap);

        rover.execute('r');

        expect(rover.getDirection()).toBe('W');
      });

      it('should turn right from West to North', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'W', worldMap);

        rover.execute('r');

        expect(rover.getDirection()).toBe('N');
      });

      it('should complete full rotation with right turns (N->E->S->W->N)', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('rrrr');

        expect(rover.getDirection()).toBe('N');
      });
    });

    describe('mixed rotation commands', () => {
      it('should return to original direction with left then right', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('lr');

        expect(rover.getDirection()).toBe('N');
      });

      it('should return to original direction with right then left', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('rl');

        expect(rover.getDirection()).toBe('N');
      });

      it('should handle more than 360 degrees rotation', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('rrrrr');

        expect(rover.getDirection()).toBe('E');
      });

      it('should maintain position when only rotating', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 3, y: 7 }, 'N', worldMap);

        rover.execute('lrlrlr');

        expect(rover.getPosition()).toEqual({ x: 3, y: 7 });
      });
    });
  });

  describe('Fase 4: Movement (F and B)', () => {
    describe('move forward (F)', () => {
      it('should move forward one step when facing North', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 5, y: 6 });
      });

      it('should move forward one step when facing South', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'S', worldMap);

        rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 5, y: 4 });
      });

      it('should move forward one step when facing East', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'E', worldMap);

        rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 6, y: 5 });
      });

      it('should move forward one step when facing West', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'W', worldMap);

        rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 4, y: 5 });
      });

      it('should move forward multiple steps', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('ff');

        expect(rover.getPosition()).toEqual({ x: 5, y: 7 });
      });
    });

    describe('move backward (B)', () => {
      it('should move backward one step when facing North', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('b');

        expect(rover.getPosition()).toEqual({ x: 5, y: 4 });
      });

      it('should move backward one step when facing South', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'S', worldMap);

        rover.execute('b');

        expect(rover.getPosition()).toEqual({ x: 5, y: 6 });
      });

      it('should move backward one step when facing East', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'E', worldMap);

        rover.execute('b');

        expect(rover.getPosition()).toEqual({ x: 4, y: 5 });
      });

      it('should move backward one step when facing West', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'W', worldMap);

        rover.execute('b');

        expect(rover.getPosition()).toEqual({ x: 6, y: 5 });
      });

      it('should move backward multiple steps', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('bb');

        expect(rover.getPosition()).toEqual({ x: 5, y: 3 });
      });
    });

    describe('mixed forward and backward', () => {
      it('should return to original position with forward then backward', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('fb');

        expect(rover.getPosition()).toEqual({ x: 5, y: 5 });
      });

      it('should return to original position with backward then forward', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('bf');

        expect(rover.getPosition()).toEqual({ x: 5, y: 5 });
      });

      it('should handle complex movement pattern', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('ffbfb');

        expect(rover.getPosition()).toEqual({ x: 5, y: 6 });
      });
    });

    describe('position history', () => {
      it('should track position history during forward movement', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        const result = rover.execute('ff');

        expect(result.positionHistory).toEqual([
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
        ]);
      });

      it('should track position history with mixed commands', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 0, y: 0 }, 'N', worldMap);

        const result = rover.execute('frfl');

        expect(result.positionHistory).toEqual([
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
        ]);
      });
    });
  });

  describe('Fase 5: Map Boundaries (Flat Planet)', () => {
    describe('boundaries prevent movement', () => {
      it('should not move beyond north boundary', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 9 }, 'N', worldMap);

        const result = rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 5, y: 9 });
        expect(result.status).toBe('obstacle-detected');
      });

      it('should not move beyond south boundary', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 0 }, 'S', worldMap);

        const result = rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 5, y: 0 });
        expect(result.status).toBe('obstacle-detected');
      });

      it('should not move beyond east boundary', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 9, y: 5 }, 'E', worldMap);

        const result = rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 9, y: 5 });
        expect(result.status).toBe('obstacle-detected');
      });

      it('should not move beyond west boundary', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 0, y: 5 }, 'W', worldMap);

        const result = rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 0, y: 5 });
        expect(result.status).toBe('obstacle-detected');
      });

      it('should not move backward beyond boundaries', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 0 }, 'N', worldMap);

        const result = rover.execute('b');

        expect(rover.getPosition()).toEqual({ x: 5, y: 0 });
        expect(result.status).toBe('obstacle-detected');
      });
    });

    describe('corners and edges', () => {
      it('should handle corner: northeast', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 9, y: 9 }, 'N', worldMap);

        rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 9, y: 9 });
      });

      it('should handle corner: southwest', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 0, y: 0 }, 'S', worldMap);

        rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 0, y: 0 });
      });

      it('should stop at boundary after multiple moves', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 8 }, 'N', worldMap);

        rover.execute('fff');

        expect(rover.getPosition()).toEqual({ x: 5, y: 9 });
      });
    });

    describe('boundary abort sequence', () => {
      it('should abort sequence when hitting boundary', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 9 }, 'N', worldMap);

        const result = rover.execute('ffff');

        expect(rover.getPosition()).toEqual({ x: 5, y: 9 });
        expect(result.status).toBe('obstacle-detected');
        expect(result.positionHistory).toEqual([{ x: 5, y: 9 }]);
      });

      it('should report boundary position as obstacle', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 9 }, 'N', worldMap);

        const result = rover.execute('f');

        expect(result.obstaclePosition).toEqual({ x: 5, y: 10 });
      });
    });
  });

  describe('Fase 6: Obstacle Detection', () => {
    describe('obstacle blocking movement', () => {
      it('should not move into position with obstacle', () => {
        const worldMap = new WorldMap(10, 10, [{ x: 5, y: 6 }]);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        const result = rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 5, y: 5 });
        expect(result.status).toBe('obstacle-detected');
      });

      it('should report obstacle position', () => {
        const worldMap = new WorldMap(10, 10, [{ x: 5, y: 6 }]);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        const result = rover.execute('f');

        expect(result.obstaclePosition).toEqual({ x: 5, y: 6 });
      });

      it('should abort sequence when hitting obstacle', () => {
        const worldMap = new WorldMap(10, 10, [{ x: 5, y: 6 }]);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        const result = rover.execute('fff');

        expect(rover.getPosition()).toEqual({ x: 5, y: 5 });
        expect(result.positionHistory).toEqual([{ x: 5, y: 5 }]);
        expect(result.status).toBe('obstacle-detected');
      });

      it('should move up to last valid position before obstacle', () => {
        const worldMap = new WorldMap(10, 10, [{ x: 5, y: 7 }]);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        const result = rover.execute('fff');

        expect(rover.getPosition()).toEqual({ x: 5, y: 6 });
        expect(result.positionHistory).toEqual([
          { x: 5, y: 5 },
          { x: 5, y: 6 },
        ]);
      });

      it('should detect obstacle when moving backward', () => {
        const worldMap = new WorldMap(10, 10, [{ x: 5, y: 4 }]);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        const result = rover.execute('b');

        expect(rover.getPosition()).toEqual({ x: 5, y: 5 });
        expect(result.status).toBe('obstacle-detected');
      });
    });

    describe('multiple obstacles', () => {
      it('should handle multiple obstacles', () => {
        const obstacles = [
          { x: 5, y: 6 },
          { x: 6, y: 5 },
          { x: 4, y: 5 },
        ];
        const worldMap = new WorldMap(10, 10, obstacles);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        const result = rover.execute('f');

        expect(rover.getPosition()).toEqual({ x: 5, y: 5 });
        expect(result.status).toBe('obstacle-detected');
      });

      it('should navigate around obstacles with valid path', () => {
        const obstacles = [{ x: 5, y: 7 }];
        const worldMap = new WorldMap(10, 10, obstacles);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('frfb');

        // f: (5,6), r: turn to E, f: (6,6), b: (5,6)
        expect(rover.getPosition()).toEqual({ x: 5, y: 6 });
      });
    });

    describe('obstacle sequence behavior', () => {
      it('should execute commands before hitting obstacle', () => {
        const worldMap = new WorldMap(10, 10, [{ x: 5, y: 7 }]);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        const result = rover.execute('fffrff');

        // f: (5,6), f: (5,7) would hit obstacle, stops at (5,6)
        // The sequence aborts, so r and ff are not executed
        expect(rover.getPosition()).toEqual({ x: 5, y: 6 });
        expect(rover.getDirection()).toBe('N');
        expect(result.positionHistory).toHaveLength(2);
      });

      it('should execute rotations before obstacle is encountered', () => {
        const worldMap = new WorldMap(10, 10, [{ x: 6, y: 5 }]);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('rrffrf');

        // r: turn to E, r: turn to S, f: (5,4), f: (5,3), r: turn to W, f: (4,3)
        expect(rover.getPosition()).toEqual({ x: 4, y: 3 });
        expect(rover.getDirection()).toBe('W');
      });
    });

    describe('edge cases with obstacles', () => {
      it('should handle rover surrounded by obstacles', () => {
        const obstacles = [
          { x: 5, y: 6 }, // North
          { x: 5, y: 4 }, // South
          { x: 6, y: 5 }, // East
          { x: 4, y: 5 }, // West
        ];
        const worldMap = new WorldMap(10, 10, obstacles);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        let result = rover.execute('f');
        expect(result.status).toBe('obstacle-detected');
        expect(rover.getPosition()).toEqual({ x: 5, y: 5 });
      });
    });
  });
});
