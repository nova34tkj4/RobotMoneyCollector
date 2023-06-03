interface RobotOnTableProps {
  rows: number | undefined;
  cols: number | undefined;
  x: number;
  y: number;
}

export const isValidCoordinate = (x: number) => Number.isInteger(x) && Math.sign(x) >= 0;

export const isRobotOnTable = ({ rows = 5, cols = 5, x, y }: RobotOnTableProps) =>
  x > -1 && x < cols && y > -1 && y < rows;

export const getRotateClass = (rotateDeg: number) => {
  const ROTATE_MAP = new Map();
  ROTATE_MAP.set(0, 'rotate-0');
  ROTATE_MAP.set(90, 'rotate-90');
  ROTATE_MAP.set(180, 'rotate-180');
  ROTATE_MAP.set(270, 'rotate-[270deg]');
  ROTATE_MAP.set(360, 'rotate-[360deg]');
  return ROTATE_MAP.get(rotateDeg);
};