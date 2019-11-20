import React from 'react';
import './Controls.css';

function Controls({difficulty, changeDifficultyHandler, startGameHandler, solveGameHandler}) {
  return (
    <div id='controls'>
      <select id='difficulty' defaultValue={difficulty} onChange={changeDifficultyHandler}>
        <option value='1'>Easy</option>
        <option value='2'>Medium</option>
        <option value='3'>Hard</option>
        <option value='4'>Evil</option>
      </select>
      <input id='startgame' type='button' value='Start Game' onClick={startGameHandler} />
      <input id='solvegame' type='button' value='Solve Knowns' onClick={solveGameHandler} />
      Sudoku Grids From: <a href='http://www.websudoku.com/' title='Web Sudoku'>Web Sudoku</a>
    </div>
  )
}

export default Controls;