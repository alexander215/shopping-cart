import React, { Component } from 'react';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';
import TotalsContainer from './TotalsContainer/TotalsContainer';
import CouponInput from './CouponInput/CouponInput';
import CouponContainer from './CouponContainer/CouponContainer';

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
    console.log(newSubtotal, "<-newsubtotal")
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
    if (currentSubtotal < 0) {currentSubtotal = 0};
    return [currentSubtotal, currentWeight];
  }

  // This calculates the shipping
  calculateShipping = (newSubtotal, weight) => {
    if (newSubtotal > 400 || this.state.freeShippingCouponApplied === 0) {
      return 'Free shipping!';
    } else if (weight <= 10 && weight > 0){
      return 30;
    } else if (weight > 10) {
      let overWeight = 0;
      while (weight >= 10) {
        overWeight++;
        weight -= 5;
      }
      return (overWeight * 7) + 30;
    } else {
      return 0;
    }
  }

  // This calculates the total
  calculateTotalAmount = (newSubtotal, newShipping) => {
    let totalDiscount = 0;
    if (this.state.fixedCouponApplied) { totalDiscount = this.state.fixedCouponApplied}
    if (typeof newShipping === 'number') {
      let newTotal = newSubtotal + newShipping - totalDiscount;
      if (newTotal < 0) {newTotal = 0};
      return newTotal;
    } else {
      let newTotal = newSubtotal - totalDiscount;
      if (newTotal < 0) {newTotal = 0};
      return newSubtotal - totalDiscount;
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
    let couponIndex = null;
    this.state.coupons.forEach( element => {
      if(element.name === customerCoupon) {
        couponApproved = true;
        couponIndex = this.state.coupons.findIndex( element => element.name == customerCoupon);
        // this.activateCoupon(element);
        this.activateCoupon(couponIndex);
      }
    })
    
    console.log('coupon index: ', couponIndex);
    this.setState({
      couponSubmitted: true,
      couponApprovalMessage: couponApproved
    })
  }

  // This activates a valid coupon
  activateCoupon = (couponIndex) => {
    console.log('coupon in activateCoupon', couponIndex);
    let coupon = this.state.coupons[couponIndex];
    console.log('coupon in activateCoupon', coupon);
    let newTotals = this.state.items;
    let newCoupons = this.state.coupons;
    newCoupons[couponIndex] = {
      ...newCoupons[couponIndex],
      active: true
    }
    if (coupon.type === 'percentual') {
      this.setState({
        percentualCouponApplied: coupon.value
      }, () => this.calculateTotals(newTotals))
    } else if (coupon.type === 'fixed-amount') {
      this.setState({
        fixedCouponApplied: coupon.value
      }, () => this.calculateTotals(newTotals))
    } else if (coupon.type === 'free-shipping') {
      this.setState({
        freeShippingCouponApplied: coupon.value
      }, () => this.calculateTotals(newTotals))
    }
  }
  // // This activates a valid coupon based off of passing in an element
  // activateCoupon = (coupon) => {
  //   console.log('coupon in activateCoupon', coupon);
  //   let newTotals = this.state.items;
  //   if (coupon.type === 'percentual') {
  //     this.setState({
  //       percentualCouponApplied: coupon.value
  //     }, () => this.calculateTotals(newTotals))
  //   } else if (coupon.type === 'fixed-amount') {
  //     this.setState({
  //       fixedCouponApplied: coupon.value
  //     }, () => this.calculateTotals(newTotals))
  //   } else if (coupon.type === 'free-shipping') {
  //     this.setState({
  //       freeShippingCouponApplied: coupon.value
  //     }, () => this.calculateTotals(newTotals))
  //   }
  // }

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
