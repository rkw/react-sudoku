import React from 'react';
import './Box.css';


function Box() {
  let boxView

  return (
    <div className={`box inline ${this.state.value ? "done" : ""} ${this.state.guess ? "guessed" : ""}
            ${this.state.show ? "show" : ""} ${((this.state.cell + 1) % 3 == 0) ? "gapRight" : ""} 
            ${(this.state.cell >= 18 && cell < 27) || (this.state.cell >= 45 && cell < 54) ? "gapBottom" : ""}`}>
      <span class="done">{this.state.value}</span>
      <span class="guessed">{this.state.guess}></span>
    </div>
  )
}

export default Box;

