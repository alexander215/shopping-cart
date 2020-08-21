import React from 'react';
import '../App.css';

const LineItemContainer = (props) => {
  return (
    <tr>
      <td className='line-item line-item-left'>
        {props.name}
      </td>
      <td className='line-item'>
        <input className='amount-input' type='number' min='0' id={props.id} value={props.weight} name={props.name} onChange={props.weightUpdate} /> kg
      </td>
      <td className='line-item line-item-right'>
        ${props.currentPrice}
      </td>
    </tr>
  )
}

export default LineItemContainer;
