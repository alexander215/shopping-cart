import React, { Component } from 'react';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';
import TotalsContainer from './TotalsContainer/TotalsContainer';
import CouponInput from './CouponInput/CouponInput';
import CouponMessages from './CouponMessages/CouponMessages';

class App extends Component {
  state = {
    items: [
      { id: 1, name: 'Banana', weight: 0, price: 10, currentPrice: 0 },
      { id: 2, name: 'Apple', weight: 0, price: 20, currentPrice: 0 },
      { id: 3, name: 'Orange', weight: 0, price: 30, currentPrice: 0 }
    ],
    coupons: [
      { id: 1, name: '30_PERCENT', active: false, type: 'percentual', value: 30, savings: '30%' },
      { id: 2, name: '100_OFF', active: false, type: 'fixed-amount', value: 100, savings: '$100'},
      { id: 3, name: 'FREE_SHIPPING', active: false, type: 'free-shipping', value: 0, savings: 'Free!'},
    ],
    customerCoupon: '',
    subtotal: 0,
    shipping: 0,
    total: 0,
    couponSavings: 0,
    couponSubmitted: false,
    couponApprovalStatus: null,
    percentualCouponApplied: null,
    fixedCouponApplied: null,
    freeShippingCouponApplied: null,
    currentCouponInUse: null,
    couponApprovalMessage: null
  }

  // This is called when the user adds items to their cart.
  // It increases the weight and calls calculatePrice to update the price.
  weightUpdate = (e) => {
    const updateItemIndex = this.state.items.findIndex( element => element.id == e.target.id );
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
      let preDiscountSubtotal = newSubtotal;
      newSubtotal *= (1 - (this.state.percentualCouponApplied * .01 ));
      this.calculateDiscountAmount(preDiscountSubtotal, newSubtotal)
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
    newItems.map( element => ((
      currentSubtotal += element.currentPrice,
      currentWeight += element.weight
      )))
    if (currentSubtotal < 0) {currentSubtotal = 0};
    return [currentSubtotal, currentWeight];
  }

  // This calculates the shipping
  calculateShipping = (newSubtotal, weight) => {
    if (newSubtotal > 400) {
      return 'Free shipping!';
    } else if (weight <= 10 && weight > 0){
      if (this.state.freeShippingCouponApplied === 0) {
        this.calculateDiscountAmount(30, 0)
        return 'Free shipping!';
      }
      return 30;
    } else if (weight > 10) {
      let overWeight = 0;
      while (weight >= 10) {
        overWeight++;
        weight -= 5;
      }
      overWeight = (overWeight * 7) + 30;
      if (this.state.freeShippingCouponApplied === 0) {
        this.calculateDiscountAmount(overWeight, 0)
        return 'Free shipping!';
      }
      return overWeight;
    } else {
      return 0;
    }
  }

  // This calculates the total
  calculateTotalAmount = (newSubtotal, newShipping) => {
    let totalDiscount = 0;
    if (typeof newShipping === 'number') {
      let totalBeforeDiscount = newSubtotal + newShipping;
      totalDiscount = this.state.fixedCouponApplied;
      let newTotal = newSubtotal + newShipping - totalDiscount;
      if (newTotal < 0) {newTotal = 0};
      if (this.state.fixedCouponApplied) { 
        this.calculateDiscountAmount(totalBeforeDiscount, newTotal)
        }
        return newTotal;
    } else {
        let totalBeforeDiscount = newSubtotal 
        totalDiscount = this.state.fixedCouponApplied;
        let newTotal = newSubtotal - totalDiscount;
        if (newTotal < 0) {newTotal = 0};
        if (this.state.fixedCouponApplied) { 
          this.calculateDiscountAmount(totalBeforeDiscount, newTotal)
        }
      return newTotal;
    }
  };

  calculateDiscountAmount = (totalBeforeSavings, newTotal) => {
    let totalSavings = totalBeforeSavings - newTotal
    this.setState({
      couponSavings: totalSavings
    })

  }

  // This handleChange takes the input for the coupon field
  handleChange = (e) => {
    this.setState({
      customerCoupon: e.target.value
    })
  }

  // This validates the coupon submitted by the user
  checkForCoupon = (e) => {
    e.preventDefault();
    let couponApproved = false;
    const customerCoupon = this.state.customerCoupon;
    let couponApprovalMessage = 'Sorry, that is not a valid coupon.';
    if (this.state.couponSubmitted === true) { couponApprovalMessage = 'Sorry, you can only use one coupon per transaction.'}
    let couponIndex = null;
    this.state.coupons.forEach( element => {
      if(element.name === customerCoupon) {
        couponApproved = true;
        couponApprovalMessage = null;
        couponIndex = this.state.coupons.findIndex( element => element.name === customerCoupon);
        this.activateCoupon(couponIndex);
      }
    })
    this.setState({
      couponSubmitted: true,
      couponApprovalStatus: couponApproved,
      couponApprovalMessage: couponApprovalMessage
    })
  }

  // This activates a valid coupon
  activateCoupon = (couponIndex) => {
    let coupon = this.state.coupons[couponIndex];
    let newTotals = this.state.items;
    let newCoupons = this.state.coupons;
    newCoupons[couponIndex] = {
      ...newCoupons[couponIndex],
      active: true
    }
    if (coupon.type === 'percentual') {
      this.setState({
        currentCouponInUse: coupon,
        percentualCouponApplied: coupon.value,
        customerCoupon: ''
      }, () => this.calculateTotals(newTotals))
    } else if (coupon.type === 'fixed-amount') {
      this.setState({
        currentCouponInUse: coupon,
        fixedCouponApplied: coupon.value,
        customerCoupon: ''
      }, () => this.calculateTotals(newTotals))
    } else if (coupon.type === 'free-shipping') {
      this.setState({
        currentCouponInUse: coupon,
        freeShippingCouponApplied: coupon.value,
        customerCoupon: ''
      }, () => this.calculateTotals(newTotals))
    }
  }

  removeCoupon = () => {
    const couponType = this.state.currentCouponInUse.name;
    let newSubtotal = this.state.subtotal;
    let newTotal = this.state.total;
    let newShipping = this.state.shipping;
    switch (couponType) {
      case 'fixed-amount':
        newSubtotal += this.state.couponSavings;
        break;
      case 'percentual':
        newTotal += this.state.couponSavings;
      case 'free-shipping':
        newShipping += this.state.couponSavings
    }
    let couponToDeactivateIndex = this.state.coupons.findIndex( element => element.name === this.state.currentCouponInUse.name);
    let newCoupons = this.state.coupons;
    newCoupons[couponToDeactivateIndex] = {
      ...newCoupons[couponToDeactivateIndex],
      active: false
    }
    let newTotals = this.state.items
    this.setState({
      currentCouponInUse: null,
      coupons: newCoupons,
      subtotal: newSubtotal,
      total: newTotal,
      shipping: newShipping,
      percentualCouponApplied: null,
      fixedCouponApplied: null,
      freeShippingCouponApplied: null
    }, () => this.calculateTotals(newTotals))
  }

  render() {
    return (
      <div className="App">
        <div className="cart-container">
          <div className="cart-section">
            <ItemContainer fruit={this.state.items} coupons={this.state.coupons} weightUpdate={e => this.weightUpdate(e)} removeCoupon={() => this.removeCoupon()} couponSavings={this.state.couponSavings}/>
          </div>
            <hr className="cart-divider"/>
          <div className="cart-section">
            <TotalsContainer subtotal={this.state.subtotal} shipping={this.state.shipping} total={this.state.total}/>
          </div>
            <hr className="cart-divider"/>
          <div className="cart-section">
            <CouponInput handleChange={this.handleChange} customerCoupon={this.state.customerCoupon} checkForCoupon={e => this.checkForCoupon(e)}/>
            {(this.state.couponSubmitted && !this.state.couponApprovalStatus) ? <CouponMessages couponApprovalMessage={this.state.couponApprovalMessage} /> : null }
          </div>
        </div>
        <input className='purchase-button' type='submit' value='Purchase' />
      </div>
  );
}
}

export default App;
