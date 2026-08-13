import { useState } from 'react';
import { TURNS, WINNER_COMBOS } from '../constants/game';

const checkWinner = (boardToCheck: (string | null)[]) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
      return boardToCheck[a];
    }
  }
  return null;
};

export function useTicTacToe() {
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
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turn === TURNS.PLAYER_X ? TURNS.PLAYER_O : TURNS.PLAYER_X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return {
    board,
    turn,
    winner,
    updateBoard,
    resetGame
  };
}
