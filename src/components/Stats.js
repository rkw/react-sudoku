import React from 'react';

function Stats({done, guessed, remaining}) {
  return (
    <div id='stats'>
      <span>{done} boxes done.</span>
      <span>{guessed} boxes guessed.</span>
      <span>{remaining} boxes remaining.</span>
    </div>
  )
}

export default Stats;