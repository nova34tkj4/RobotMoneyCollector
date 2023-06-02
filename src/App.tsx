import Grid from "./components/Grid";
import Modal from "./components/Modal";
import compass from "./assets/compass.png";

function App() {
  return (
    <div className='p-20'>
      <h1 className="font-bold text-center text-3xl mb-4">
        Robot Money Collector
      </h1>

      <div className="flex flex-row mb-4 items-center">
        <img src={compass} alt="compass" className="w-20" />
        <div className="flex flex-col flex-1">
          <input type="text" placeholder="Your wish is my command"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-14"
          />
          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Available Commands : PLACE X,Y,F | MOVE | LEFT | RIGHT
          </p>
        </div>
      </div>
      <Grid />
      <Modal />
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
