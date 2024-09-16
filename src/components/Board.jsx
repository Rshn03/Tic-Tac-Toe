// src/Board.jsx
import React, { useState } from 'react';
import Square from './Square';
import './Board.css'; // Import CSS for styling

const Board = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]); // Stores the history of the game
  const [currentMove, setCurrentMove] = useState(0); // Tracks the current move
  const [isXNext, setIsXNext] = useState(true); // Tracks if X is the next player

  const currentSquares = history[currentMove].squares;

  // Handle click event for a square
  const handleClick = (index) => {
    const historyUpToCurrent = history.slice(0, currentMove + 1);
    const currentSquares = historyUpToCurrent[historyUpToCurrent.length - 1].squares;

    if (calculateWinner(currentSquares) || currentSquares[index]) return;

    const newSquares = currentSquares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';

    setHistory(historyUpToCurrent.concat([{ squares: newSquares }])); // Update history
    setCurrentMove(historyUpToCurrent.length); // Move to the next step
    setIsXNext(!isXNext); // Switch player
  };

  // Jump to a specific move in the history
  const jumpTo = (move) => {
    setCurrentMove(move); // Set the current move to the selected move
    setIsXNext(move % 2 === 0); // If the move is even, it's X's turn, otherwise O's turn
  };

  // Reset game to the initial state
  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setCurrentMove(0);
    setIsXNext(true);
  };

  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(square => square !== null);

  // Determine the status message based on the game state
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Match is a draw!'
      : `Next player: ${isXNext ? 'X' : 'O'}`;

  // Render square by passing the correct props
  const renderSquare = (index) => {
    return (
      <Square
        value={currentSquares[index]}
        onClick={() => handleClick(index)}
      />
    );
  };

  // Generate a list of moves
  const moves = history.map((step, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game-container">
      <div className="board-container">
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
      </div>
      <div className="history-container">
        <h3>History</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// Calculate the winner based on board state
const calculateWinner = (squares) => {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default Board;
