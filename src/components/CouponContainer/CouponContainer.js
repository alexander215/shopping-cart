import React from 'react';

const CouponContainer = (props) => {
  return (
    <div>
      {props.name} <input type='submit' value='Remove' /> $-{props.amountOfDiscount}  ({props.savings})
    </div>
  )
}

export default CouponContainer;
