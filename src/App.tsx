import { SquareCell } from './components/SquareCell';
import { useTicTacToe } from './hooks/useTicTacToe';

function App() {
  const { board, turn, winner, updateBoard, resetGame } = useTicTacToe();


  return (
    <>
      <main className='flex flex-col items-center justify-center h-screen w-full'>
        <section className={`flex flex-col justify-center items-center
         transition-transform duration-500 ease 
          ${winner !== null ? '-translate-y-5' : 'translate-y-10'}`}>
          <div className="grid grid-cols-3 grid-rows-3
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
          </div>
          <h2 className="text-2xl mt-4">Turn: {turn}</h2>
        </section>

        <div className="h-28 flex flex-col justify-center items-center">
          {winner !== null && (
            <div className="flex flex-col justify-center items-center slide-up">
              <h2 className='text-4xl tracking-tight font-medium'>{winner === false ? "Draw" : `Winner: ${winner}`}</h2>
              <button onClick={() => resetGame()} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Reset
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
