import React from 'react';

const CouponInput = (props) => {
  return (
    <div>
      <form onSubmit={props.checkForCoupon}>
        <input type='text' placeholder='Coupon code' onChange={props.handleChange} />
        <input type='submit' value='Apply' />
      </form>
    </div>
  )
}

export default CouponInput;
