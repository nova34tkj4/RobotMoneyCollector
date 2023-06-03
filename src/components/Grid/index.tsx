import * as React from 'react';
import robot from '../../assets/robot.png'
import { getRotateClass, getRandomMoney, generateRandomNumber } from '../../utils';

export interface RobotPosition {
  x: number | undefined;
  y: number | undefined;
}

interface GridProps {
  cols?: number;
  rows?: number;
  robotPosition?: RobotPosition;
  rotateDeg?: number;
  totalMove: number;
}

export default function Grid({
  cols = 5,
  rows = 5,
  robotPosition,
  rotateDeg = 0,
  totalMove,
}: GridProps) {
  const {x, y} = robotPosition || {};
  const randomMoneyVal = getRandomMoney(rows, cols);
  const randomMoney = React.useRef(randomMoneyVal)
  const randomInterestRate = generateRandomNumber(5, 25)
  
  const rotateClass = getRotateClass(rotateDeg);
  const arrCols = Array.from(Array(cols), (_,i) => i+1)
  const arrRows = Array.from(Array(rows), (_,i) => i+1)

  return (
    <div>
      <p className='text-right'>Total move: {totalMove}</p>
      <div className='flex flex-row'>
        <div className='mr-2'>
          Y
        </div>
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
                      const randomMoneyMap = randomMoney.current;
                      const isMoneyExist = randomMoneyMap && randomMoneyMap[rowIndex as keyof typeof randomMoneyMap] !== undefined 
                        && randomMoneyMap[rowIndex as keyof typeof randomMoneyMap][colIndex] !== undefined;
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
                              ${randomMoneyMap[rowIndex as keyof typeof randomMoneyMap][colIndex]}
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
      <p className='text-right'>X</p>
      <div className='bg-blue-100 rounded p-4'>
        <p className='text-center font-bold mb-4 text-xl'>
            Your Robot Earning
        </p>
        <div className='bg-blue-100'>
          <div className='flex flex-row'>
            <div className='flex flex-1 flex-col'>
              <div className='text-center font-bold'>
                2000
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
                2100
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