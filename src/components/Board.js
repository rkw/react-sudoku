import React from 'react';
import './Board.css';

class BoxDetail {
  constructor(value, cell) {
    this.value = value    //.. known value for cell
    this.guess = 0        //.. users guess
    this.cell = cell      //.. 0 to 80, going across
    this.show = false     //.. pop up is open
    this.possible = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]   //.. possible values (it can never be 0)
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      boxes: [],
      groups: []
    }
  }

  guess(cell, i) {
    let boxes = this.state.boxes
    boxes[cell].guess = i
    boxes[cell].show = 0
    this.setState({ boxes: boxes })
  }

  setValue(cell, i) {
    if (i !== 0) {
      let boxes = this.state.boxes
      boxes[cell].value = i
      boxes[cell].possible = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]   //.. remove possible guesses once manually guessed
      this.setState({ boxes: boxes })
    }
  }

  setPossible(cell, pos) {
    let boxes = this.state.boxes
    var curr = boxes[cell].possible

    for (var i in pos) {
      curr[i] = curr[i] & pos[i]
    }

    if (curr.filter(Boolean).length === 1) {
      boxes[cell].value = curr.indexOf(1)
    } else {
      boxes[cell].possible = curr
    }

    this.setState({ boxes: boxes })
  }

  getPossible(cell) {
    return this.state.boxes[cell].possible
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // reset state when new data is loaded
    if (nextProps.data !== prevState.data) {
      let boxes = []
      let groups = []

      // Set all 81 boxes
      for (let i = 0; i < 81; i++) {
        let box = new BoxDetail(nextProps.data[i], i)
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
        arr[i + 9] = [0 + k, 9 + k, 18 + k, 27 + k, 39 + k, 45 + k, 54 + k, 63 + k, 72 + k]
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

      return { boxes: boxes, groups: groups, data: nextProps.data }
    }
    else
      return null
  }

  render() {
    return (
      <div id="board">{this.props.data.toString()}</div>
    )
  }
}

export default Board;