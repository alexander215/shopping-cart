import React, { Component } from 'react';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';
import TotalsContainer from './TotalsContainer/TotalsContainer';
import CouponInput from './CouponInput/CouponInput';

class App extends Component {
  state = {
    items: [
      { id: 1, name: 'Banana', weight: 0, price: 10, currentPrice: 0 },
      { id: 2, name: 'Apple', weight: 0, price: 20, currentPrice: 0 },
      { id: 3, name: 'Orange', weight: 0, price: 30, currentPrice: 0 }
    ],
    coupons: [
      { id: 1, name: '30_PERCENT', active: false, type: 'percentual', value: 30 },
      { id: 2, name: '100_OFF', active: false, type: 'fixed-amount', value: 100},
      { id: 3, name: 'FREE_SHIPPING', active: false, type: 'free-shipping', value: 0 },
    ],
    customerCoupon: null,
    subtotal: 0,
    shipping: 0,
    total: 0,
    couponSubmitted: false,
    couponApprovalMessage: null,
    percentualCouponApplied: null,
    fixedCouponApplied: null,
    freeShippingCouponApplied: null

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
    this.calculateTotals(newItems);
    this.setState({
      items: newItems
    })
  }

  // This calculates the price of items using the amount and price / kg
  calculatePrice = (index, weight) => {
    return this.state.items[index].price * weight
  }

  // This calculates and sets state for all three totals
  calculateTotals = (newItems) => {
    let calculateSubtotalsWeight = this.calculateSubtotal(newItems);
    let newSubtotal = calculateSubtotalsWeight[0];
    if (this.state.percentualCouponApplied) { 
      newSubtotal *= (1 - (this.state.percentualCouponApplied * .01 ))
    }
    let newShipping = this.calculateShipping(newSubtotal, calculateSubtotalsWeight[1]);
    let newTotal = this.calculateTotalAmount(newSubtotal, newShipping);
    this.setState({
      subtotal: newSubtotal,
      shipping: newShipping,
      total: newTotal
    })
  }

  // This calculates the current subtotal
  calculateSubtotal = (newItems) => {
    let currentSubtotal = 0;
    let currentWeight = 0;
    newItems.map( element => (
      currentSubtotal += element.currentPrice,
      currentWeight += element.weight
    ))
    
    return [currentSubtotal, currentWeight];
  }

  // This calculates the shipping
  calculateShipping = (newSubtotal, weight) => {
    if (newSubtotal > 400) {
      return 'Free shipping!';
    } else if (weight <= 10){
      return 30;
    } else {
      let overWeight = 0;
      while (weight >= 10) {
        overWeight++;
        weight -= 5;
      }
      return (overWeight * 7) + 30;
    }
  }

  // This calculates the total
  calculateTotalAmount = (newSubtotal, newShipping) => {
    if (typeof newShipping === 'number') {
      return newSubtotal + newShipping;
    } else {
      return newSubtotal;
    }
  };

  // This handleChange takes the input for the coupon field
  handleChange = (e) => {
    this.setState({
      customerCoupon: e.target.value
    })
  }

  // This validates the coupon submitted by the user
  checkForCoupon = (e) => {
    e.preventDefault();
    console.log('customer coupon: ', this.state.customerCoupon);
    let couponApproved = false;
    const customerCoupon = this.state.customerCoupon;
    this.state.coupons.forEach( element => {
      if(element.name === customerCoupon) {
        couponApproved = true;
        this.activateCoupon(element);
      }
    })
    this.setState({
      couponSubmitted: true,
      couponApprovalMessage: couponApproved
    })
  }

  // This activates a valid coupon
  activateCoupon = (coupon) => {
    console.log(coupon);
    if (coupon.type === 'percentual') {
      this.setState({
        percentualCouponApplied: coupon.value
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Shopping Cart</h1>
        <ItemContainer fruit={this.state.items} coupons={this.state.coupons} weightUpdate={e => this.weightUpdate(e)} />
        <hr/>
        <TotalsContainer subtotal={this.state.subtotal} shipping={this.state.shipping} total={this.state.total}/>
        <hr/>
        <CouponInput handleChange={this.handleChange} checkForCoupon={e => this.checkForCoupon(e)}/>
        {(this.state.couponSubmitted && !this.state.couponApprovalMessage) ? 'Sorry, that is not a valid coupon.' : null }
      </div>
  );
}
}

export default App;
