import React from 'react';
import './App.css';
import Stats from './components/Stats';
import Controls from './components/Controls';
import Board from './components/Board';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      done: 0,
      guessed: 0,
      remaining: 81,
      totalClicks: 0,
      solveGame: false,
      started: false,
      difficulty: 2,
      data: []
    }
    this.startGame = this.startGame.bind(this)
    this.updateStats = this.updateStats.bind(this)
  }

  startGame() {
    let data = [
      4, 0, 0, 0, 0, 0, 0, 5, 9,
      3, 0, 0, 0, 5, 0, 6, 0, 4,
      0, 1, 0, 0, 0, 8, 0, 0, 0,
      7, 0, 0, 8, 0, 3, 0, 6, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 5, 0, 9, 0, 4, 0, 0, 7,
      0, 0, 0, 3, 0, 0, 0, 2, 0,
      2, 0, 6, 0, 8, 0, 0, 0, 3,
      9, 7, 0, 0, 0, 0, 0, 0, 8
    ];

    fetch(`sudoku-data?level=${this.state.difficulty}`)
      .then(res => res.json())
      .then(
        (result) => { data = result },
        (error) => { console.log(error) }
      )
      .then(
        () => {
          this.setState({ started: true, solveGame: false, totalClicks: 0, done: 0, guessed: 0, remaining: 81, data: data })
        }
      )
  }

  updateStats({ done, guessed, remaining }) {
    let totalClicks = this.state.totalClicks + 1
    this.setState({ done, guessed, remaining, totalClicks })
  }

  render() {
    let totalClicks
    if (this.state.started) totalClicks = <div id='totalclicks' className='inline'>Total moves: {this.state.totalClicks}</div>

    return (
      <div>
        <div id='title' className='inline'>
          <h1>Sudoku Solver / Helper</h1>
        </div>

        {totalClicks}

        <Controls difficulty={this.state.difficulty}
          startGameHandler={this.startGame}
          changeDiffcultyHandler={(e) => this.setState({ difficulty: e.value })}
          solveGameHandler={() => this.setState({ solveGame: true })}>
        </Controls>

        <Board data={this.state.data} solveGame={this.state.solveGame} statsHandler={this.updateStats}></Board>

        <Stats started={this.state.started} done={this.state.done}
          guessed={this.state.guessed} remaining={this.state.remaining}>
        </Stats>
      </div >
    )
  }
}

export default App;
