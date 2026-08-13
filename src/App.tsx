import { useState } from 'react';
import { SquareCell } from './components/SquareCell';
import { TURNS } from './constants/game';
import {WINNER_COMBOS } from './constants/game';

const checkWinner = (boardToCheck: (string | null)[]) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
      return boardToCheck[a];
    }
  }
  return null;
};

function App() {
  const [board, setBoard] = useState<(string | null)[]>(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState<string>(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TURNS.PLAYER_X;
  });

  const [winner, setWinner] = useState<string | null | false>(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) {
      const parsedBoard = JSON.parse(boardFromStorage);
      const win = checkWinner(parsedBoard);
      if (win) return win;
      if (!parsedBoard.includes(null)) return false;
    }
    return null;
  });

  const updateBoard = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];

    newBoard[index] = turn;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (!newBoard.includes(null)) {
      setWinner(false);
    }

    localStorage.setItem("board", JSON.stringify(newBoard));

    const nextTurn = turn === TURNS.PLAYER_X ? TURNS.PLAYER_O : TURNS.PLAYER_X;
    setTurn(nextTurn);
    localStorage.setItem("turn", nextTurn);
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turn === TURNS.PLAYER_X ? TURNS.PLAYER_O : TURNS.PLAYER_X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
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
              />
            ))
          }
        </section>
        <h2 className="text-2xl mt-4">Turn: {turn}</h2>
        {winner !== null &&
          (
            <h2>{winner === false ? "Draw" : `Winner: ${winner}`}</h2>
          )
        }

        <button onClick={() => resetGame()} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Reset
        </button>

      </main>
    </>
  )
}

export default App
