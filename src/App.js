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
    this.changeDifficulty = this.changeDifficulty.bind(this)
    this.updateStats = this.updateStats.bind(this)
    this.gameWon = this.gameWon.bind(this)
  }

  startGame() {
    // let data = [
    //   4, 0, 0, 0, 0, 0, 0, 5, 9,
    //   3, 0, 0, 0, 5, 0, 6, 0, 4,
    //   0, 1, 0, 0, 0, 8, 0, 0, 0,
    //   7, 0, 0, 8, 0, 3, 0, 6, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 5, 0, 9, 0, 4, 0, 0, 7,
    //   0, 0, 0, 3, 0, 0, 0, 2, 0,
    //   2, 0, 6, 0, 8, 0, 0, 0, 3,
    //   9, 7, 0, 0, 0, 0, 0, 0, 8
    // ];
    let data = [
      3, 6, 7, 8, 9, 0, 5, 4, 2, 
      2, 8, 1, 3, 4, 5, 7, 6, 9, 
      5, 4, 9, 6, 2, 7, 0, 3, 8, 
      6, 2, 3, 7, 1, 4, 8, 9, 5, 
      7, 5, 8, 9, 3, 2, 4, 1, 6, 
      9, 1, 4, 5, 6, 8, 2, 7, 3, 
      4, 3, 2, 1, 5, 9, 6, 8, 7, 
      1, 7, 6, 2, 8, 3, 9, 5, 4, 
      8, 9, 5, 4, 7, 6, 3, 2, 0
    ]

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

  changeDifficulty({value}) {
    this.setState({ difficulty: value })
    this.startGame()
  }

  updateStats({ done, guessed, remaining }) {
    let totalClicks = this.state.totalClicks + 1
    this.setState({ done, guessed, remaining, totalClicks })
  }

  gameWon() {
    if (window.confirm(`Congratulations!\nYou solved it in ${this.state.totalClicks} clicks.\n\nContinue to new game?`))
      this.startGame()
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
          changeDiffcultyHandler={this.changeDifficulty}
          solveGameHandler={() => this.setState({ solveGame: true })}>
        </Controls>

        <Board data={this.state.data} solveGame={this.state.solveGame} 
          statsHandler={this.updateStats} winHandler={this.gameWon}>
        </Board>

        <Stats started={this.state.started} done={this.state.done}
          guessed={this.state.guessed} remaining={this.state.remaining}>
        </Stats>
      </div >
    )
  }
}

export default App;
