import React from 'react'

const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // ✅ Check winner
  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6]          // diagonals
    ];
    for (let [a,b,c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (squares[index] || winner) return; // ignore if filled or game over
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    const win = calculateWinner(newSquares);
    if (win) {
      setWinner(win);
    } else if (!newSquares.includes(null)) {
      setWinner("Draw");
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="board">
      <h1>Tic‑Tac‑Toe</h1>
      <div className="grid">
        {squares.map((value, i) => (
          <button
            key={i}
            className="square"
            onClick={() => handleClick(i)}
          >
            {value}
          </button>
        ))}
      </div>
      <button id="reset" onClick={resetGame}>Reset</button>
      <p>
        {winner
          ? winner === "Draw"
            ? "It's a draw!"
            : `Winner: ${winner}`
          : `Next player: ${xIsNext ? "X" : "O"}`}
      </p>
    </div>
  );
}





function App() {
  return (
    <div>
      
      <Board />
    </div>
  )
}

export default App
