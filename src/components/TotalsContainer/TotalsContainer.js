import React from 'react'

const TotalsContainer = (props) => {
  return (
    <div>
      Subtotal: {props.subtotal}
      <br/>
      Shipping: {props.shipping}
      <br/>
      Total: {props.total}
    </div>
  )
}

export default TotalsContainer
