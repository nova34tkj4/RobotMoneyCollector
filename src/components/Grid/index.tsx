import * as React from 'react';
import robot from '../../assets/robot.png'
import { getRotateClass, getRandomMoney, generateRandomNumber, numberWithCommas } from '../../utils';
import { nanoid } from 'nanoid';

export interface RobotPosition {
  x: number | undefined;
  y: number | undefined;
}

export interface Payload {
  userId: string;
  totalMoneyAvailable: number;
  movementHistorie?: string[];
  totalMoneyFound: number;
  interestRate: number;
  totalMoneyEarn: number;
}

interface GridProps {
  cols?: number;
  rows?: number;
  robotPosition?: RobotPosition;
  rotateDeg?: number;
  totalMove: number;
  isReset: boolean;
  onGameOver?: (payload: Payload) => void;
}

let availableMoney = 0;
export default function Grid({
  cols = 5,
  rows = 5,
  robotPosition,
  rotateDeg = 0,
  totalMove,
  isReset,
  onGameOver
}: GridProps) {
  const [randomMoney, setRandomMoney] = React.useState({});
  const [randomInterestRate, setRandomInterestRate] = React.useState(5);
  const [moneyEarned, setMoneyEarned] = React.useState(0);
  const [moneyFound, setMoneyFound] = React.useState(0);
  const {x, y} = robotPosition || {};

  React.useEffect(() => {
    setRandomInterestRate(generateRandomNumber(5, 25));
    setRandomMoney(getRandomMoney(rows, cols));
  }, [isReset, cols, rows])

  React.useEffect(() => {
    if (moneyEarned === 0) {
      setMoneyEarned(moneyFound);
    } else {
      setMoneyEarned(Math.floor(moneyFound + (moneyFound * randomInterestRate/100)));
    }
  }, [moneyFound, randomInterestRate, availableMoney]);

  React.useEffect(() => {
    if (totalMove <= 0 || (moneyFound > 0 && availableMoney === 0)) {
      const userId = nanoid();
      const payload = {
        userId,
        totalMoneyAvailable: availableMoney + moneyFound,
        totalMoneyFound: moneyFound,
        interestRate: randomInterestRate,
        totalMoneyEarn: moneyEarned
      }
      onGameOver?.(payload);
    }
  }, [totalMove, moneyFound, availableMoney, randomInterestRate])

  React.useEffect(() => {
    availableMoney = 0;
    Object.keys(randomMoney).forEach((keyRow: unknown) => {
      const rowVal = randomMoney[keyRow as keyof typeof keyRow];
      Object.keys(rowVal).forEach((keyCol: unknown) => {
        if (x === Number(keyRow) && y === Number(keyCol)) {
          const found = randomMoney[x as keyof typeof randomMoney][y];
          delete randomMoney[x as keyof typeof randomMoney][y];
          setMoneyFound(val => val + found)
        }
        availableMoney = availableMoney + randomMoney[Number(keyRow) as keyof typeof randomMoney][Number(keyCol)];
      });
    });
  }, [x, y, randomMoney, availableMoney])
  
  const rotateClass = getRotateClass(rotateDeg);
  const arrCols = Array.from(Array(cols), (_,i) => i+1)
  const arrRows = Array.from(Array(rows), (_,i) => i+1)

  return (
    <div>
      <p className='text-right'>Total move: {totalMove}</p>
      <div className='flex flex-row'>

        <div className='w-full'>
        {
          arrRows.map((_, rowIndex) => {
            return (
              <div
                key={rowIndex}
                className="flex flex-row"
              >
                {
                    arrCols.map((_, colIndex) => {
                      const isMoneyExist = randomMoney && randomMoney[colIndex as keyof typeof randomMoney] !== undefined 
                        && randomMoney[colIndex as keyof typeof randomMoney][rowIndex] !== undefined;
                      const isRobotExist = x !== undefined &&  y !== undefined && x === colIndex && y === rowIndex;
                      return (
                        <div
                          key={colIndex}
                          className={`flex flex-1 aspect-square border-solid
                            ${(colIndex + rowIndex)%2 === 0 ? 'bg-blue-200' : 'bg-blue-300'}
                            ${colIndex === arrCols.length - 1 ? 'border-x-2' : 'border-l-2'}
                            ${rowIndex === 0 ? 'border-y-2' : 'border-b-2'}
                            border-blue-100 p-2 flex items-center justify-center`}>
                          {isRobotExist && (
                            <img src={robot} alt="robot" className={`w-1/2 ${rotateClass}`} />
                          )}
                          {
                            isMoneyExist && !isRobotExist && <div className='font-bold text-xl'>
                              ${randomMoney[colIndex as keyof typeof randomMoney][rowIndex]}
                            </div>
                          } 
                        </div>
                      )
                    })
                }
              </div>
            )
          })
        }
        </div>
      </div>
      <div className='bg-blue-100 rounded p-4 mt-4'>
        <p className='text-center font-bold mb-4 text-xl'>
            Your Robot Earning
        </p>
        <div className='bg-blue-100'>
          <div className='flex flex-row'>
            <div className='flex flex-1 flex-col'>
              <div className='text-center font-bold'>
                {numberWithCommas(moneyFound)}
              </div>
              <div className='text-center'>
                Money Found
              </div>
            </div>
            <div className='flex flex-1 flex-col'>
              <div className='text-center font-bold'>
                {randomInterestRate}%
              </div>
              <div className='text-center'>
                Interest Rate
              </div>
            </div>
            <div className='flex flex-1 flex-col'>
              <div className='text-center font-bold'>
                {numberWithCommas(moneyEarned)}
              </div>
              <div className='text-center'>
                Money Earned
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}