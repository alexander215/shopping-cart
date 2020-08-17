import React from 'react'

const LineItemContainer = (props) => {
  return (
    <div>
      {props.name} | {props.price} | {props.weight}
    </div>
  )
}

export default LineItemContainer
