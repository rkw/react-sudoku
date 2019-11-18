import React from 'react';
import './App.css';
import Stats from './components/Stats';
import Controls from './components/Controls';
import Board from './components/Board';

class App extends React.Component {
  state = {
    done: 0,
    guessed: 0,
    remaining: 81
  }

  render() {
    return (
      <div>
        <div id='title' className='inline'>
          <h1>Sudoku Solver / Helper</h1>
        </div>

        <div id='totalmoves' className='inline'>
        </div>

        <Controls></Controls>

        <Board></Board>

        <Stats props={this.state}></Stats>
      </div >
    )
  }
}

export default App;
