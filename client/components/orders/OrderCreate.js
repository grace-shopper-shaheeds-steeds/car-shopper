import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { createOrder } from '../../store'

class OrderCreate extends Component {

  constructor() {
    super();
    // We will eventually package all this into one object
    // {address, addressId, cart, userId, saveAddress}
    this.state = {
      // address: this.props.contact,
      // cart: this.props.cart,
      // userId: this.user.id,
    }
  }
  handleChange = event => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }
  handleSubmit = event => {
    event.preventDefault()
    let newOrder = {
      address: { 
        street: '789 N. Mission Valley Ave', 
        city: 'San Diego', 
        state: 'CA', 
        zipCode: '98325', 
        country: 'USA', 
        addressType: 'billing', 
        email: 'clint@clint.com' 
      },
      cart: {
        products: [9,8,6],
        total: 9578950
      },
      userId: 2,
    }
    this.props.submitOrder(newOrder)
  }

  render(){
    return (
      <div className="container">
        <h3>Submit An Order Testing ..... </h3>
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit Order</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.orderReducer.contact,
    cart: state.cart.cart,
    user: state.user
  }
}

// const mapState = state => {
//   return {
//     currentUser: state.user,
//     isLoggedIn: !!state.user.id,
//     firstName: state.user.firstName,
//     cart: state.cart.cart,
//     cartProducts: state.cart.cartProducts
//   }
// }



const mapDispatchToProps = (dispatch) => {
  return {
    submitOrder: (newOrder) => {
      // dispatch(addContact(newOrder))
      dispatch(createOrder(newOrder))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreate)
