
export const ORIENTATION = {
  NORTH: { x: 0, y: -1 },
  EAST: { x: 1, y: 0 },
  SOUTH: { x: 0, y: 1 },
  WEST: { x: -1, y: 0 }
};

export const INITIAL_ROTATE_DEG = {
  NORTH: '-rotate-90',
  EAST: 'rotate-0',
  SOUTH: 'rotate-90',
  WEST: 'scale-x-[-1]'
};

export const FACING_DIRECTIONS = Object.keys(ORIENTATION);

export const COMMANDS = ['PLACE', 'MOVE', 'LEFT', 'RIGHT'];

export const ERRORS = {
  INVALID_COMMAND: `Invalid command format. Available commands are ${COMMANDS.join(' | ')}.`,
  INVALID_INITIAL_COMMAND: `Invalid PLACE command format. The valid PLACE command should be 'PLACE X,Y,F'.`,
  NOT_INITIALIZED: `The robot is not placed on the table yet. Place it first with 'PLACE X,Y,F'`,
  WRONG_PLACE: `The robot was placed out of the table`,
  WRONG_DIRECTION: `Invalid facing direction value. Available directions should be ${FACING_DIRECTIONS.join(
    ' | '
  )}.`,
  WRONG_COORDINATE: `Invalid coordinate value. It must be non-negative interger.`,
  WRONG_MOVING_DIRECTION: `The robot can't move forward on that direction, it may fall off the table.`
};

