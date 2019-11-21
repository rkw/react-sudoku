import React, { useState } from 'react'
import './App.css';
import Stats from './components/Stats';
import Controls from './components/Controls';
import Board from './components/Board';

function App() {
  const [stats, setStats] = useState({ done: 0, guess: 0, remaining: 81, totalClicks: 0 })
  const [settings, setSettings] = useState({ solveGame: false, started: false, difficulty: 2 })
  const [gameData, setGameData] = useState([])

  const startGame = async () => {
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

    await fetch(`sudoku-data?level=${settings.difficulty}`)
      .then(res => res.json())
      .then(
        (result) => { data = result },
        (error) => { console.log(error) }
      )

    setStats({ ...stats, totalClicks: 0, done: 0, guessed: 0, remaining: 81 })
    setSettings({ ...settings, started: true, solveGame: false })
    setGameData(data)
  }

  const changeDifficulty = ({ value }) => {
    setSettings({ ...settings, difficulty: value })
    startGame()
  }

  const updateStats = ({ done, guessed, remaining }) => {
    let totalClicks = stats.totalClicks + 1
    setStats({ done, guessed, remaining, totalClicks })
  }

  const gameWon = () => {
    //HACK-1: using setTimeout to push to next event loop to allow page to render
    //HACK-2: totalClicks will be 1 behind since it is frozen in this loop
    //remove hacks when flux pattern implemented
    window.setTimeout(() => {
    if (window.confirm(`Congratulations!\nYou solved it in ${stats.totalClicks+1} clicks.\n\nContinue to new game?`))
      startGame()
    }, 1)
  }

  let renderClicks
  if (settings.started) renderClicks = <div id='totalclicks' className='inline'>Total moves: {stats.totalClicks}</div>

  return (
    <div>
      <div id='title' className='inline'>
        <h1>Sudoku Solver / Helper</h1>
      </div>

      {renderClicks}

      <Controls difficulty={settings.difficulty}
        startGameHandler={startGame}
        changeDiffcultyHandler={changeDifficulty}
        solveGameHandler={() => setSettings({ ...settings, solveGame: true })}>
      </Controls>

      <Board data={gameData} solveGame={settings.solveGame}
        statsHandler={updateStats} winHandler={gameWon}>
      </Board>

      <Stats started={settings.started} done={stats.done}
        guessed={stats.guessed} remaining={stats.remaining}>
      </Stats>
    </div >
  )
}

export default App
