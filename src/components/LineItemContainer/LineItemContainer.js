import React from 'react';
import '../App.css';

const LineItemContainer = (props) => {
  return (
    <tr>
      <td class='line-item line-item-left'>
        {props.name}
      </td>
      <td class='line-item'>
        <input class='amount-input' type='number' min='0' id={props.id} value={props.weight} name={props.name} onChange={props.weightUpdate} /> kg
      </td>
      <td class='line-item line-item-right'>
        ${props.currentPrice}
      </td>
    </tr>
  )
}

export default LineItemContainer;

// import React from 'react';
// import '../App.css';

// const LineItemContainer = (props) => {
//   return (
//     <div class="line-item">
//       <div class="line-title">
//         {props.name}
//       </div>
//       <div>
//         <input type='number' min='0' id={props.id} value={props.weight} name={props.name} onChange={props.weightUpdate} /> kg
//       </div>
//       <div class="line-price">
//         ${props.currentPrice}
//       </div>
//     </div>
//   )
// }

// export default LineItemContainer;
