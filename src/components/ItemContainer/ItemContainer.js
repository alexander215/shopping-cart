import React, {useState} from 'react'

const ItemContainer = (props) => {

  return (
    <div>
      <h2>Items</h2>
      {props.fruit[0].name}

    </div>
  )
}

export default ItemContainer
