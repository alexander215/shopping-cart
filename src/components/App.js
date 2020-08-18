import React, { Component } from 'react';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';
import TotalsContainer from './TotalsContainer/TotalsContainer';

class App extends Component {
  state = {
    items: [
      { id: 1, name: 'Banana', weight: 0, price: 10, currentPrice: 0 },
      { id: 2, name: 'Apple', weight: 0, price: 20, currentPrice: 0 },
      { id: 3, name: 'Orange', weight: 0, price: 30, currentPrice: 0 }
    ],
    coupons: [
      { id: 1, name: '30_PERCENT', active: false },
      { id: 2, name: '100_OFF', active: false },
      { id: 3, name: 'FREE_SHIPPING', active: false },
    ],
    totals: [
      { id: 1, name: 'Subtotal', value: 0 },
      { id: 2, name: 'Shipping', value: 0 },
      { id: 3, name: 'Total', value: 0 }
    ]
  }

  // This is called when the user adds items to their cart.
  // It increases the weight and calls calculatePrice to update the price.
  weightUpdate = (e) => {
    const updateItemIndex = this.state.items.findIndex( element => element.id == e.target.id);
    const newItems = [...this.state.items];
    const newWeight = parseInt(e.target.value);
    const newCurrentPrice = this.calculatePrice(updateItemIndex, newWeight)
    newItems[updateItemIndex] = {
      ...newItems[updateItemIndex],
      weight: newWeight,
      currentPrice: newCurrentPrice
    }
    this.setState({
      items: newItems
    })
  }

  // This calculates the price of items using the amount and price / kg
  calculatePrice = (index, weight) => {
    return this.state.items[index].price * weight
  }

  render() {
    return (
      <div className="App">
        <h1>Shopping Cart</h1>
        <ItemContainer fruit={this.state.items} coupons={this.state.coupons} weightUpdate={e => this.weightUpdate(e)} />
        <hr/>
        <TotalsContainer totals={this.state.totals}/>
      </div>
  );
}
}

export default App;
