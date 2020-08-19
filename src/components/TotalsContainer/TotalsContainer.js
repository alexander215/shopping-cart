import React from 'react';
import '../App.css';

const TotalsContainer = (props) => {
  return (
    <table class="table-section">
      <tbody>
        <tr class="total-item">
          <td class='line-item line-item-left'>
            Subtotal:
          </td>
          <td class='line-item line-item-right'>
            $ {props.subtotal}
          </td>
        </tr>
        <tr class="total-item">
          <td class='line-item line-item-left'>
            Shipping:
          </td>
          <td class='line-item line-item-right'>
          {(typeof props.shipping === 'number') ? <span>$</span> : null } {props.shipping}
          </td>
        </tr>
        <tr class="total-item">
          <td class='line-item line-item-left'>
            <strong>
              Total:
            </strong>
          </td>
          <td class='line-item line-item-right'>
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
