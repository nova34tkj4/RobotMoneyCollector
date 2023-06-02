
export const ORIENTATION = {
  NORTH: { x: 0, y: 1 },
  EAST: { x: 1, y: 0 },
  SOUTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 }
};

export const INITIAL_ROTATE_DEG = {
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270
};

export const FACING_DIRECTIONS = Object.keys(ORIENTATION);

export const COMMANDS = ['PLACE', 'MOVE', 'LEFT', 'RIGHT'];

