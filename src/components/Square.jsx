// src/Square.jsx
import React from 'react';

// Square component takes value and onClick as props
const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
