import Grid, { type RobotPosition } from "./components/Grid";
import Modal from "./components/Modal";
import TutorialList from "./components/TutorialList";
import Credits from "./components/Credits";
import compass from "./assets/compass.png";
import * as React from "react";
import Input from "./components/Input";
import { COMMANDS, ERRORS, FACING_DIRECTIONS, FACING_FROM_DEGREE, INITIAL_ROTATE_DEG, ORIENTATION } from "./constants";
import { isRobotOnTable, isValidCoordinate } from "./utils";

function App() {
  const [textCommand, setTextCommand] = React.useState('');
  const [rows, setRows] = React.useState<number>();
  const [cols, setCols] = React.useState<number>();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [robotPosition, setRobotPosition] = React.useState<RobotPosition>({ x: undefined, y: undefined });
  const [facingPostion, setFacingPosition] = React.useState<RobotPosition>({ x: 0, y: 0 });
  const [rotateDeg, setRotateDeg] = React.useState(0);
  const [isRobotPlaced, setIsRobotPlaced] = React.useState(false);
  const [totalMove, setTotalMove] = React.useState(15);

  React.useEffect(() => {
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.code === "Space" && isRobotPlaced) {
        runCommand('MOVE')
      }
    })
  }, [])

  const moveLeftRight = (type: 'left' | 'right') => {
    const {x, y} = robotPosition || {};
    let deg = rotateDeg - 90
    let rotate = deg === -90 ? 270 : deg
    if (type === 'right') {
      deg = rotateDeg + 90
      rotate = deg === 360 ? 0 : deg;
    }
    setRobotPosition({x, y})
    setTextCommand('');

    setRotateDeg(rotate)
    const direction = FACING_FROM_DEGREE[rotate as keyof typeof FACING_FROM_DEGREE]
    const {x: orX, y: orY} = ORIENTATION[direction as keyof typeof ORIENTATION];
    setFacingPosition({x: orX, y: orY})
  }

  const runCommand = (keyboardCommand?: string) => {
    const commandVal = textCommand.split(/[\s,]+/);
    const command = keyboardCommand || commandVal[0];
    const {x, y} = robotPosition || {};
    const {x: facingX = 0, y: facingY = 0} = facingPostion || {}
    if (command) {
      if (!COMMANDS.includes(command)) {
        setErrorMessage(ERRORS.INVALID_COMMAND)
        return;
      } 

      if (!isRobotPlaced && command !== 'PLACE') {
        setErrorMessage(ERRORS.NOT_INITIALIZED);
        return;
      }
      
      switch (command) {
        case 'PLACE': {
          if (commandVal.length < 4) {
            setErrorMessage(ERRORS.INVALID_INITIAL_COMMAND);
          } else {
            const x = Number(commandVal[1]);
            const y = Number(commandVal[2]);
            const f = commandVal[3];
    
            if (!isValidCoordinate(x) || !isValidCoordinate(y)) {
              setErrorMessage(ERRORS.WRONG_COORDINATE);
              return;
            }
    
            if (!FACING_DIRECTIONS.includes(f)) {
              setErrorMessage(ERRORS.WRONG_DIRECTION);
              return;
            }
    
            if (!isRobotOnTable({ rows, cols, x, y })) {
              setErrorMessage(ERRORS.WRONG_PLACE);
              return;
            }
            setRobotPosition({x, y})
            setIsRobotPlaced(true);
            setTextCommand('');
            const {x: facingX, y: facingY} = ORIENTATION[f as keyof typeof ORIENTATION] || {};
            setFacingPosition({x: facingX, y: facingY})
            setRotateDeg(INITIAL_ROTATE_DEG[f as keyof typeof INITIAL_ROTATE_DEG])
          }
          return;
        }
        case 'MOVE': {
          console.log("di sini")
          if (totalMove === 0) {
            setErrorMessage(ERRORS.EMPTY_MOVE);
            return;
          }
          if (x !== undefined && y !== undefined) {
            const nextX = x + facingX;
            const nextY = y + facingY;
            console.log(nextX, nextY)
    
            if (!isRobotOnTable({ rows, cols, x: nextX, y: nextY })) {
              setErrorMessage(ERRORS.WRONG_MOVING_DIRECTION);
              return;
            }
            setRobotPosition({x: nextX, y: nextY})
            setTotalMove(val => val - 1);
            setTextCommand('');
          }
          return;
        }
        case 'LEFT': {
          moveLeftRight('left')
          return;
        }
        case 'RIGHT': {
          moveLeftRight('right')
          return;
        }
      }

    }
  }

  const reset = () => {
    setRobotPosition({x: undefined, y: undefined})
    setFacingPosition({x: 0, y: 0})
    setTextCommand('');
    setErrorMessage('');
    setIsRobotPlaced(false);
    setRotateDeg(0);
    setTotalMove(15)
  }

  return (
    <div className='p-20'>
      <h1 className="font-bold text-center text-3xl mb-4">
        Robot Money Collector
      </h1>

      <div className="flex flex-row mb-4 items-center">
        <img src={compass} alt="compass" className="w-20" />
        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center">
            <Input
              type="text"
              placeholder="Your wish is my command"
              value={textCommand}
              onChange={(val: string) => setTextCommand(val.toUpperCase())}
            />
            <button
              onClick={() => runCommand()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
              Run
            </button>
            <button
              onClick={reset}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              Reset
            </button>
          </div>
          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Available Commands : PLACE X,Y,F | MOVE | LEFT | RIGHT
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 mb-4">
        <Input
          label="Rows"
          type="number"
          placeholder="Input rows number"
          value={rows}
          onChange={(val: string) => setRows(Number(val))}
        />
        <Input
          label="Cols"
          type="number"
          placeholder="Input columns number"
          value={cols}
          onChange={(val: string) => setCols(Number(val))}
        />
      </div>
      <Grid
        totalMove={totalMove}
        rows={rows}
        cols={cols}
        robotPosition={robotPosition}
        rotateDeg={rotateDeg}
      />
      <Modal
        title="Error Occured"
        isShow={!!errorMessage}
        description={errorMessage}
        onOk={() => setErrorMessage('')}
      />
      <TutorialList />
      <Credits />
    </div>
  )
}

export default App;
