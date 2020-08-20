import React from 'react';

const CouponContainer = (props) => {
  return (
    <tr>
      <td class='line-item line-item-left'>
        {props.name}
      </td>
      <td class='line-item'>
        <input class='remove-button' type='submit' value='Remove' onClick={props.removeCoupon}/>
      </td>
      <td class='line-item'>
        $ -{props.couponSavings}
      </td>
      <td class='line-item coupon-line-item-right'>
        ({props.savings})
      </td>
    </tr>
  )
}

export default CouponContainer;
