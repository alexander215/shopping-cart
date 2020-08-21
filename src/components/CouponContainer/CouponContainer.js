import React from 'react';

const CouponContainer = (props) => {
  return (
    <tr>
      <td className='line-item line-item-left'>
        {props.name}
      </td>
      <td className='coupon-line-item'>
        <input className='remove-button' type='submit' value='Remove' onClick={props.removeCoupon}/>
      </td>
      <td className='coupon-line-item'>
        $ -{props.couponSavings}
      </td>
      <td className='line-item coupon-line-item-right'>
        ({props.savings})
      </td>
    </tr>
  )
}

export default CouponContainer;
