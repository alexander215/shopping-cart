import React from 'react';

const CouponInput = (props) => {
  return (
    <div class='coupon-input-section'>
      <form onSubmit={props.checkForCoupon}>
        <input class='coupon-input' type='text' placeholder='Coupon code' onChange={props.handleChange} />
        <input class='coupon-button' type='submit' value='Apply' />
      </form>
    </div>
  )
}

export default CouponInput;
