import React from 'react'

const LineItemContainer = (props) => {
  return (
    <div>
      {props.name} | 

      <input type='number' min='0' value={props.weight} /> kg | 
      ${props.price}
    </div>
  )
}

export default LineItemContainer
