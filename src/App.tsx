import { useState } from 'react';
import { SquareCell } from './components/SquareCell';

function App() {
  const TURNS = {
    PLAYER_X: 'x',
    PLAYER_O: 'o'
  }

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.PLAYER_X);


  const updateBoard = (index: number) => {
    const newBoard = [...board];

    if(newBoard[index] !== null) return;

    newBoard[index] = turn;
    setBoard(newBoard);

    setTurn(turn === TURNS.PLAYER_X ? TURNS.PLAYER_O : TURNS.PLAYER_X);
  }

  return (
    <>
      <main className='flex flex-col items-center justify-center h-screen w-full'>

        <h1>Tic Tac Toe</h1>
        <section className="grid grid-cols-3 grid-rows-3
        rounded-4xl border border-black overflow-hidden">
          {
            board.map((_, index) => (
              <SquareCell
                key={index}
                index={index}
                value={board[index]}
                updateBoard={updateBoard}
              >
              </SquareCell>
            ))
          }
        </section>
        <h2 className="text-2xl mt-4">Turn: {turn}</h2>
      </main>
    </>
  )
}

export default App
