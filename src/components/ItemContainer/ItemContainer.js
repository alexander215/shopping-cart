import React from 'react';
import LineItemContainer from '../LineItemContainer/LineItemContainer';
import CouponContainer from '../CouponContainer/CouponContainer';


const ItemContainer = (props) => {
  const lineItems = props.fruit;
  const coupons = props.coupons;

  const displayLineItems = lineItems.map( element => (
    <LineItemContainer key={element.id} id={element.id} name={element.name} currentPrice={element.currentPrice} weight={element.weight} weightUpdate={props.weightUpdate}/>
  ))

  const displayCoupons = coupons.map( element => {
    if (element.active) { 
      return <CouponContainer key={element.id} name={element.name} active={element.active} savings={element.savings} amountOfDiscount={element.amountOfDiscount} removeCoupon={props.removeCoupon} couponSavings={props.couponSavings}/>
    } else {
      return <></>
    }
  })

  return (
    <div>
      <table className="table-section">
        <tbody>
          {displayLineItems}
        </tbody>
      </table>
      <table className="table-section">
        <tbody>
          {displayCoupons}
        </tbody>
      </table>
    </div>
  )
}

export default ItemContainer;
