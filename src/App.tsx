import { useState } from 'react';
import { SquareCell } from './components/SquareCell';

function App() {
  const TURNS = {
    PLAYER_X: 'x',
    PLAYER_O: 'o'
  }

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.PLAYER_X);
  const [winner, setWinner] = useState(null);
  
  const checkWinner = (newBoard: string[]) => {
    const WINNER_COMBOS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        return newBoard[a];
      }
    }
    return null;
  }
  
  const updateBoard = (index: number) => {
    
    if (board[index] || winner) return;
    const newBoard = [...board];
    
    newBoard[index] = turn;
    setBoard(newBoard);
    
    if(checkWinner(newBoard)) return;

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
        {winner && <h2>Winner: {winner}</h2>}
      </main>
    </>
  )
}

export default App
