import React from 'react';
import '../App.css';

const TotalsContainer = (props) => {
  return (
    <table className="table-section">
      <tbody>
        <tr className="total-item">
          <td className='line-item line-item-left'>
            Subtotal:
          </td>
          <td className='line-item line-item-right'>
            $ {props.subtotal}
          </td>
        </tr>
        <tr className="total-item">
          <td className='line-item line-item-left'>
            Shipping:
          </td>
          <td className='line-item line-item-right'>
          {(typeof props.shipping === 'number') ? <span>$</span> : null } {props.shipping}
          </td>
        </tr>
        <tr className="total-item">
          <td className='line-item line-item-left'>
            <strong>
              Total:
            </strong>
          </td>
          <td className='line-item line-item-right'>
            <strong>
            $ {props.total} 
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TotalsContainer
