import React from 'react';
import './Board.css';

class Board extends React.Component {
  state = {
    value: 0,
    guess: 0,
    show: false,
    cell: 0,
  }
  render() {
    return (
      <div id="board"></div>
    )
  }
}

export default Board;