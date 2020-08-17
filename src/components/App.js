import React, { Component } from 'react';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';

class App extends Component {
  state = {
    items: [
      { id: 1, name: 'Banana', weight: 0, price: 10 },
      { id: 2, name: 'Apple', weight: 0, price: 20 },
      { id: 3, name: 'Orange', weight: 0, price: 30 },
    ]
  }

  render() {
    return (
      <div className="App">
      <h1>Shopping Cart</h1>
      {/* <ItemContainer fruit={item}/> */}
      <ItemContainer fruit={this.state.items}/>
    </div>
  );
}
}

export default App;
