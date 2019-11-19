
import React from 'react';
import './Guess.css';


function Guess({ possible, guessHandler }) {
  let possibleView = possible.map((v,i) => {
    if (v) 
      return <li key={i} value={i} onClick={guessHandler}>{i}</li>
    else
      return null
  }, this)

  return (
    <ul className="guesses">
      {possibleView}
      <li key={0} value='0' onClick={guessHandler}>clear</li>
    </ul>
  )
}

export default Guess;