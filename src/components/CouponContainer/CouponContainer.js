import React from 'react'

const CouponContainer = (props) => {
  return (
    <div>
      Coupon: {props.active ? <p>{props.name}</p> : null}
      
    </div>
  )
}

export default CouponContainer
