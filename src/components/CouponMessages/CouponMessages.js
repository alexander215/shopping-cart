import React from 'react';

const CouponMessages = (props) => {
  return (
    <div>
      {props.couponApprovalMessage}
      {/* Sorry, that is not a valid coupon. */}
    </div>
  )
}

export default CouponMessages;
