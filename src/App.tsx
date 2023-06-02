import Grid, { type RobotPosition } from "./components/Grid";
import Modal from "./components/Modal";
import compass from "./assets/compass.png";
import * as React from "react";
import Input from "./components/Input";
import { COMMANDS, ERRORS, FACING_DIRECTIONS, ORIENTATION } from "./constants";
import { isRobotOnTable, isValidCoordinate } from "./utils";

function App() {
  const [textCommand, setTextCommand] = React.useState('');
  const [rows, setRows] = React.useState<number>();
  const [cols, setCols] = React.useState<number>();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [robotPosition, setRobotPosition] = React.useState<RobotPosition>({ x: undefined, y: undefined, f: 'EAST'});
  const [isRobotPlaced, setIsRobotPlaced] = React.useState(false);

  const runCommand = () => {
    const commandVal = textCommand.split(/[\s,]+/);
    const command = commandVal[0];
    if (command) {
      if (!COMMANDS.includes(command)) {
        setErrorMessage(ERRORS.INVALID_COMMAND)
        return;
      } else {
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
              setRobotPosition({x, y, f})
              setIsRobotPlaced(true);
            }
            return;
          }
          case 'MOVE': {
            if (!isRobotPlaced) {
              setErrorMessage(ERRORS.NOT_INITIALIZED);
              return;
            }
            const {x, y, f} = robotPosition || {};
            const {x: facingX, y: facingY} = ORIENTATION[f as keyof typeof ORIENTATION] || {};
            if (x && y) {
              const nextX = x + facingX;
              const nextY = y + facingY;
              console.log("nextX", nextX)
              console.log("nextX", nextY)
      
              if (!isRobotOnTable({ rows, cols, x: nextX, y: nextY })) {
                setErrorMessage(ERRORS.WRONG_MOVING_DIRECTION);
                return;
              }
              setRobotPosition({x: nextX, y: nextY, f})
            }
            return;
          }
          case 'LEFT': {
            return;
          }
          case 'RIGHT': {
            return;
          }
        }
      }
    }
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
              onClick={runCommand}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
              Run
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
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
      
      <Grid rows={rows} cols={cols} robotPosition={robotPosition} />
      <Modal
        title="Error Occured"
        isShow={!!errorMessage}
        description={errorMessage}
        onOk={() => setErrorMessage('')}
      />
      <h1 className="font-bold text-2xl mt-10 mb-4">
        TUTORIAL
      </h1>
      <ul className="list-disc">
        <li>
          <p className="font-bold text-xl">PLACE X,Y,F</p>
          <p>PLACE will put the toy robot on the table in position X, Y and facing NORTH, SOUTH, EAST or WEST. The origin (0,0) can be the SOUTH WEST most corner.</p>
        </li>
        <li>
          <p className="font-bold text-xl">MOVE</p>
          <p>MOVE will move the toy robot one unit forward in the direction it is currently facing. </p>
        </li>
        <li>
          <p className="font-bold text-xl">LEFT & RIGHT</p>
          <p>LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot. User can use arrow keys to change the direction of the robot.</p>
        </li>
        <li>
          <p className="font-bold text-xl">GAME OVER</p>
          <p>The game over when the robot has collected all the money OR total movement = 0. When the game over you can send the game result to server.</p>
        </li>
      </ul>
      <h1 className="font-bold text-2xl mt-10 mb-4">
        CREDITS
      </h1>
      <div>
        <a href="https://www.flaticon.com/free-icons/compass" title="compass icons">Compass icons created by Freepik - Flaticon</a>
      </div>
      <div>
        <a href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created by Smashicons - Flaticon</a>
      </div>
    </div>
  )
}

export default App
