import robot from '../../assets/robot.png'
import { getRotateClass } from '../../utils';

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

export default function Grid({cols = 5, rows = 5, robotPosition, rotateDeg = 0, totalMove}: GridProps) {
  const {x, y} = robotPosition || {};
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
                    arrCols.map((_, colIndex) => (
                      <div
                        key={colIndex}
                        className={`flex flex-1 aspect-square border-solid
                          ${(colIndex + rowIndex)%2 === 0 ? 'bg-blue-200' : 'bg-blue-300'}
                          ${colIndex === arrCols.length - 1 ? 'border-x-2' : 'border-l-2'}
                          ${rowIndex === 0 ? 'border-y-2' : 'border-b-2'}
                          border-blue-100 p-2 flex items-center justify-center`}>
                            {x === colIndex && y === rowIndex && (
                              <img src={robot} alt="robot" className={`w-1/2 ${rotateClass}`} />
                            )}
                              
                      </div>
                    ))
                }
              </div>
            )
          })
        }
        </div>
      </div>
      <p className='text-right'>X</p>
    </div>

  )
}