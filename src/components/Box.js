import React from 'react';
import './Box.css';


class Box extends React.Component {
  state = {
    value: 0, //.. known value for cell
    guess: 0,
    cell: 0,  //.. 0 to 80, going across
    show: 0,  //.. boolean: pop up is open
    possible: [0,1,1,1,1,1,1,1,1,1]   //.. possible values (it can never be 0)
  }

  guess(i) {
    this.setState({guess: i, show: 0});
  }

  setValue(i) {
    if (i != 0) {
        this.setState({value: i});
        this.setState({possible: [0,0,0,0,0,0,0,0,0,0]});   //.. remove possible guesses once manually guessed
    }
  }

  setPossible(pos) {
    var curr = this.state.possible;
    for (var i in pos) {
        curr[i] = curr[i] & pos[i];
    }
    
    if (curr.filter(Boolean).length==1) {
        this.setState({value: curr.indexOf(1)});         
    } else {
        this.setState({possible: curr});
    }        
  }
        
  getPossible() {
      return this.state.possible;
  }
  
  render() {
    return (
      <div className={`box inline ${this.state.value ? "done" : ""} ${this.state.guess ? "guessed" : ""}
            ${this.state.show ? "show" : ""} ${((this.state.cell + 1) % 3 == 0) ? "gapRight" : ""} 
            ${(this.state.cell >= 18 && cell < 27) || (this.state.cell >= 45 && cell < 54) ? "gapBottom" : ""}`}>
        <span class="done">{this.state.value}</span>
        <span class="guessed">{this.state.guess}></span>
      </div>
    )
  }
}

export default Box;

