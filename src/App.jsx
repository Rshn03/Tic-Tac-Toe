// src/App.jsx
import React from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board></Board>
    </div>
  );
}

export default App;
