
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


  // var divLoc = $(this.el).offset();
  // $(pop).filter('ul.guesses')
  //     .css({'top': divLoc.top - 25, 'left': divLoc.left + 25})
  //     .hide()
  //     .appendTo('body')
  //     .fadeIn(500);

  // Bind click event to the model's guess() method,
  //.. bind the scope of of guess() to the model,
  //.. pass in the li item value
  // var thisView = this;
  // $('ul.guesses li').click(function() {
  //     _.bind(thisView.model.guess, thisView.model, $(this).val())();
  // });
}

export default Guess;