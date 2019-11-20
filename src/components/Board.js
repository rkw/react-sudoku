import React, { useState } from 'react'
import Box from './Box'
import Guess from './Guess'
import './Board.css'

function Board({ data, solveGame, statsHandler, winHandler }) {
  const [boxes, setBoxes] = useState([])
  const [groups, setGroups] = useState([])

  const [showing, setShowing] = useState(-1)
  const [boardData, setBoardData] = useState([])
  const [gameSolved, setGameSolved] = useState(false)

  const setGuess = (e) => {
    boxes[showing].guess = e.target.value
    setBoxes(boxes)
    setShowing(-1)
    reportStats()
    checkWin()
  }

  const reportStats = () => {
    let done = boxes.filter((box) => box.value > 0).length
    let guessed = boxes.filter((box) => box.guess > 0).length
    let remaining = 81 - done
    statsHandler({ done, guessed, remaining })
  }

  const checkWin = () => {
    for (let i = 0; i < groups.length; i++) {
      let group = groups[i]
      let values = new Set(group.map((box) => box.value || box.guess).filter(Boolean))
      if (values.size < 9) return false
    }
    winHandler()
  }

  const setPossible = (box, poss) => {
    let curr = box.possible

    for (let i = 0; i < poss.length; i++) {
      curr[i] = curr[i] & poss[i]
    }

    if (curr.filter(Boolean).length === 1) {
      box.value = curr.indexOf(1)
      box.possible = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    } else {
      box.possible = curr
    }
  }

  const findKnownAnswers = () => {
    let repeat = true

    while (repeat) {
      // repeat until no reductions are possible
      repeat = false

      // eslint-disable-next-line 
      groups.forEach(group => {
        let knowns = group.map((box) => box.value).filter(Boolean)
        let poss = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

        for (let i in knowns) {
          poss[knowns[i]] = 0;
        }

        group.forEach((box) => {
          if (box.value === 0) {
            setPossible(box, poss)
            if (box.value !== 0) repeat = true
          }
        })
      })
    }

    setGroups(groups)
    setGameSolved(true)
  }

  const loadData = (data) => {
    let boxes = []
    let groups = []

    // Set all 81 boxes
    for (let i = 0; i < 81; i++) {
      let box = new BoxDetail(data[i], i)
      boxes.push(box)
    }

    // Create 27 groups: 9 horizotal rows, 9 vertical rows, 9 sections
    for (let i = 0; i < 27; i++) {
      groups[i] = []
    }

    let arr = []   //.. hold box indexes for the groups

    // Indexes for horizontal rows
    for (let i = 0; i < 9; i++) {
      let k = 9 * i
      arr[i] = [0 + k, 1 + k, 2 + k, 3 + k, 4 + k, 5 + k, 6 + k, 7 + k, 8 + k]
    }

    // Indexes for vertical rows
    for (var i = 0; i < 9; i++) {
      let k = i
      arr[i + 9] = [0 + k, 9 + k, 18 + k, 27 + k, 36 + k, 45 + k, 54 + k, 63 + k, 72 + k]
    }

    // Indexes for sections
    for (let i = 18; i < 27; i++) {
      arr[i] = []
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        arr[18].push((0 + j) + (i * 9))
        arr[19].push((3 + j) + (i * 9))
        arr[20].push((6 + j) + (i * 9))
        arr[21].push((27 + j) + (i * 9))
        arr[22].push((30 + j) + (i * 9))
        arr[23].push((33 + j) + (i * 9))
        arr[24].push((54 + j) + (i * 9))
        arr[25].push((57 + j) + (i * 9))
        arr[26].push((60 + j) + (i * 9))
      }
    }

    // Add boxes to groups
    for (let i in groups) {
      for (let j in arr[i]) {
        groups[i].push(boxes[arr[i][j]])
      }
    }

    setBoxes(boxes)
    setGroups(groups)
    setBoardData(data)
    setGameSolved(false)
  }

  if (data.length > 0 && boardData !== data) loadData(data)
  if (solveGame && !gameSolved) findKnownAnswers()

  let renderBoxes
  if (boxes.length) {
    renderBoxes = boxes.map(({ cell, value, guess }) => {
      // prevent click if a sure value already exists
      let clickable = value ? null : (e) => setShowing(cell)

      return <Box key={cell} value={value} guess={guess} cell={cell} showing={showing}
        showGuessHandler={clickable}>
      </Box>
    })
  }

  let renderGuess
  if (showing > -1) {
    renderGuess = <Guess guessHandler={setGuess}
      possible={boxes[showing].possible}>
    </Guess>
  }

  return (
    <div>
      <div id="board">{renderBoxes}</div>
      <div id="guesses">{renderGuess}</div>
    </div>
  )

}

class BoxDetail {
  constructor(value, cell) {
    this.value = value    //.. known value for cell
    this.guess = 0        //.. users guess
    this.cell = cell      //.. 0 to 80, going across
    this.possible = (value === 0)
      ? [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]    //.. value can never be zero
      : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]    //.. if a value is set, nothing is possible
  }
}

export default Board;

