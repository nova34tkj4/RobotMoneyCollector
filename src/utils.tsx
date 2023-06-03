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

export const generateRandomNumber = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min)) + min;

export const deepMergeObject = (targetObject = {}, sourceObject = {}) => {
  const copyTargetObject = JSON.parse(JSON.stringify(targetObject));
  const copySourceObject = JSON.parse(JSON.stringify(sourceObject));
  Object.keys(copySourceObject).forEach((key) => {
    if (typeof copySourceObject[key] === "object" && !Array.isArray(copySourceObject[key])) {
      copyTargetObject[key] = deepMergeObject(
        copyTargetObject[key],
        copySourceObject[key]
      );
    } else {
      copyTargetObject[key] = copySourceObject[key];
    }
  });
  return copyTargetObject;
}
  

export const getRandomMoney = (rows: number, cols: number) => {
  let randomMoneyMap = {};
  const average = Math.floor((cols+rows-1)/2)
  const randomMoney = Array.from(Array(average), (_,i) => i+1)
  const randomArr = randomMoney.map(() => {
    const randomAmount = generateRandomNumber(500, 20000)
    const randomColIndex = generateRandomNumber(0, cols)
    const randomRowIndex = generateRandomNumber(0, rows)
    return {
      [randomRowIndex]: {
        [randomColIndex]: randomAmount
      }
    }
  })
  randomArr.forEach((item) => {
    randomMoneyMap = deepMergeObject(randomMoneyMap, item);
  });
  return randomMoneyMap;
}