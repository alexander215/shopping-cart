import React from 'react'

const CouponContainer = (props) => {
  return (
    <div>
      {props.active ? <p>{props.name}</p> : null}
      
    </div>
  )
}

export default CouponContainer
