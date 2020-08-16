import React, { useState } from 'react';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';

const App = () => {
  const [item, setItem] = useState('Apple')
  return (
    <div className="App">
      <h1>Shopping Cart</h1>
      <ItemContainer fruit={item}/>
    </div>
  );
}

export default App;
