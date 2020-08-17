import React from 'react';
import LineItemContainer from '../LineItemContainer/LineItemContainer';


const ItemContainer = (props) => {
  const lineItems = props.fruit;

  return (
    <div>
      <h2>Items</h2>
      {lineItems.map( element => (
          <LineItemContainer name={element.name} price={element.price} weight={element.weight}/>
      ))
      }
    </div>
  )
}

export default ItemContainer;
