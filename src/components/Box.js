import React from 'react';
import './Box.css';


function Box({cell, value, guess, showing, showGuessHandler}) {
  let style = `box inline ${value ? "done" : ""} ${guess ? "guessed" : ""}
    ${showing === cell ? "showing" : ""} ${((cell + 1) % 3 === 0) ? "gapRight" : ""} 
    ${(cell >= 18 && cell < 27) || (cell >= 45 && cell < 54) ? "gapBottom" : ""}`

  return (
    <div className={style} onClick={showGuessHandler}>
      <span className="done">{value}</span>
      <span className="guessed">{guess}</span>
    </div>
  )
}

export default Box;

