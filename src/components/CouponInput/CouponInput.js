import React from 'react';

const CouponInput = (props) => {
  return (
    <div className='coupon-input-section'>
      <form onSubmit={props.checkForCoupon}>
        <input className='coupon-input' type='text' placeholder='Coupon code' value={props.customerCoupon} onChange={props.handleChange} />
        <input className='coupon-button' type='submit' value='Apply' />
      </form>
    </div>
  )
}

export default CouponInput;
