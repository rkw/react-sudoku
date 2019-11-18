import React from 'react';
import './Controls.css';

class Controls extends React.Component {
  state = {
  }
  changeDifficulty (e) {
  }
  render() {
    return (
        <div id='controls'>
          <select id='difficulty' value='2' onChange={this.changeDifficulty}>
            <option value='1'>Easy</option>
            <option value='2'>Medium</option>
            <option value='3'>Hard</option>
            <option value='4'>Evil</option>
          </select>
          <input id='startgame' type='button' value='Start Game' />
          <input id='solvegame' type='button' value='Solve Knowns' />
          Sudoku Grids From: <a href='http://www.websudoku.com/' title='Web Sudoku'>Web Sudoku</a>
        </div>
    )
  }
}

export default Controls;