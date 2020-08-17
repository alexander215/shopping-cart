import React from 'react';
import LineItemContainer from '../LineItemContainer/LineItemContainer';
import CouponContainer from '../CouponContainer/CouponContainer';


const ItemContainer = (props) => {
  const lineItems = props.fruit;
  const coupons = props.coupons;

  const displayLineItems = lineItems.map( element => (
    <LineItemContainer name={element.name} price={element.price} weight={element.weight}/>
  ))

  const displayCoupons = coupons.map( element => {
    if (element.active) return <CouponContainer name={element.name} active={element.active}/>
  })

  return (
    <div>
      <h2>Items</h2>
      {displayLineItems}
      {displayCoupons}
    </div>
  )
}

export default ItemContainer;
