import React from 'react';

const LineItemContainer = (props) => {
  return (
    <div>
      {props.name} | 

      <input type='number' min='0' id={props.id} value={props.weight} name={props.name} onChange={props.weightUpdate} /> kg | 
      ${props.currentPrice}
    </div>
  )
}

export default LineItemContainer;
