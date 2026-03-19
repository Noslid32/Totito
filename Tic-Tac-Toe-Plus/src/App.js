import { useState } from "react";
import "./styles.css";

function Square({ value, onSquareClick, isLastMove }) {
  return (
    <button
      className={`square btn btn-outline-dark ${isLastMove ? "last-move" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, lastMove }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Ganador: ${winner}`
    : squares.every((square) => square !== null)
    ? "No hubo ganador"
    : `Turno de: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="container text-center mt-4">
      <h3 className="mb-3">{status}</h3>
      <div className="container">
        {[0, 3, 6].map((row) => (
          <div key={row} className="d-flex justify-content-center">
            {[0, 1, 2].map((col) => (
              <Square
                key={row + col}
                value={squares[row + col]}
                onSquareClick={() => handleClick(row + col)}
                isLastMove={lastMove === row + col}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, moveIndex) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setLastMove(moveIndex);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setLastMove(null);
  }

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Tic-Tac-Toe Plus</h2>
      <div className="row">
        <div className="col-md-6">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            lastMove={lastMove}
          />
        </div>
        <div className="col-md-6">
          <h4>Historial</h4>
          <ul className="list-group mt-3">
            {history.map((_, move) => (
              <li key={move} className="list-group-item">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => jumpTo(move)}
                >
                  {move > 0 ? ` movimiento #${move}` : "Iniciar partida"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
