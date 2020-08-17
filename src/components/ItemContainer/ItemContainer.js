import React, {useState} from 'react'
import LineItemContainer from '../LineItemContainer/LineItemContainer';


const ItemContainer = (props) => {

  return (
    <div>
      <h2>Items</h2>
      {/* {props.fruit[0].name} */}
      <LineItemContainer name={props.fruit[0].name} price={props.fruit[0].price} weight={props.fruit[0].weight}/>


    </div>
  )
}

export default ItemContainer
