export default function TutorialList() {
  return (
    <div className="mt-10">
      <h1 className="font-bold text-2xl mb-4">
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
          <p>User can move the robot by pressing space in keyboard.</p>
        </li>
        <li>
          <p className="font-bold text-xl">LEFT & RIGHT</p>
          <p>LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.</p>
          <p>User can use arrow keys to change the direction of the robot.</p>
        </li>
        <li>
          <p className="font-bold text-xl">GAME OVER</p>
          <p>The game over when the robot has collected all the money OR total movement = 0. When the game over you can send the game result to server.</p>
        </li>
      </ul>
    </div>
  )

}