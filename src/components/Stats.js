import React from 'react';
import './Stats.css';

function Stats({started, done, guessed, remaining}) {
  if (started)
    return (
      <div id='stats'>
        <span>{done} boxes done.</span>
        <span>{guessed} boxes guessed.</span>
        <span>{remaining} boxes remaining.</span>
      </div>
    )
  else
    return <div id='stats'></div>
}

export default Stats;