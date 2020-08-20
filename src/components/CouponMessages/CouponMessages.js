import React from 'react';

const CouponMessages = (props) => {
  return (
    <div className="error-message-container">
      {props.couponApprovalMessage}
    </div>
  )
}

export default CouponMessages;
