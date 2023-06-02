interface RobotOnTableProps {
  rows: number | undefined;
  cols: number | undefined;
  x: number;
  y: number;
}

export const isValidCoordinate = (x: number) => Number.isInteger(x) && Math.sign(x) >= 0;

export const isRobotOnTable = ({ rows = 5, cols = 5, x, y }: RobotOnTableProps) =>
  x > -1 && x < cols && y > -1 && y < rows;
