import React from 'react';
import './Controls.css';

class Controls extends React.Component {
  render() {
    return (
      <div id='controls'>
        <select id='difficulty' defaultValue={this.props.difficulty} onChange={this.props.changeDifficultyHandler}>
          <option value='1'>Easy</option>
          <option value='2'>Medium</option>
          <option value='3'>Hard</option>
          <option value='4'>Evil</option>
        </select>
        <input id='startgame' type='button' value='Start Game' onClick={this.props.startGameHandler} />
        <input id='solvegame' type='button' value='Solve Knowns' onClick={this.props.solveGameHandler} />
        Sudoku Grids From: <a href='http://www.websudoku.com/' title='Web Sudoku'>Web Sudoku</a>
      </div>
    )
  }
}

export default Controls;