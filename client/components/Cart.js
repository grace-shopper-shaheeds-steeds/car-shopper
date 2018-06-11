import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchCartInfo, fetchCartProductInfo, updateWithAdded, updateWithSubtracted, updatedWithRemoved } from '../store/cart'

const local = window.localStorage

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {}

    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchCartMethod({ userId: this.props.match.params.userId})
    this.props.fetchCartProductInfoMethod({ userId: this.props.match.params.userId})
  }

  handleIncrement(carId) {
    let obj = {
      userId: this.props.match.params.userId,
      carId
    }
    this.props.updateWithAddedMethod(obj)
  }

  handleDecrement(carId) {
    let obj = {
      userId: this.props.match.params.userId,
      carId
    }
    this.props.updateWithSubtractedMethod(obj)
  }

  handleDelete(carId) {
    let obj = {
      userId: this.props.match.params.userId,
      carId
    }
    this.props.updatedWithRemovedMethod(obj)
  }

  render() {
    const { isLoggedIn, firstName, cart, cartProducts, currentUser } = this.props
    let notUnique = []

    const uniqueProducts = cartProducts.filter(product => {
      if (notUnique.indexOf(product.id) === -1) {
        notUnique.push(product.id)
        return true
      }
      return false
    })

    return (
    <div>
      {
        (!cart) ? <div>Rendering...</div> : ''
      }
      <h3>Cart for User {currentUser.email}</h3>
      {
        uniqueProducts.map(product => {
          const subTotal = product.price * cart.quantity[product.id]

          if (!subTotal) return ''
          return (
            <div key={product.id} className='container'>
              <img src={product.photo} />
              <div>
                <div>
                  <div>Title: {product.title}</div>
                  <button onClick={() => this.handleDelete(product.id)}>Remove</button>
                </div>
                <div>Description: {product.description}</div>
                <div>Unit Price: {product.price}</div>
                <div>
                  <div>quantity {cart.quantity[product.id]}</div>
                  <div>
                    <button onClick={() => this.handleDecrement(product.id)}>- 1</button>
                    <button onClick={() => this.handleIncrement(product.id)}>+ 1</button>
                  </div>
                </div>
              </div>
              <div>Subtotal: {subTotal}</div>
            </div>
          )
        })
      }
      <div>Total: {cart.total}</div>
      <Link to='/orders/create/'>
      <button>Proceed to Checkout</button>
      </Link>
    </div>
    )
  }

}

const mapState = state => {
  return {
    currentUser: state.user,
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName,
    cart: state.cart.cart,
    cartProducts: state.cart.cartProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCartMethod: (info) => dispatch(fetchCartInfo(info)),
    fetchCartProductInfoMethod: (info) => dispatch(fetchCartProductInfo(info)),
    updateWithAddedMethod: (info) => dispatch(updateWithAdded(info)),
    updateWithSubtractedMethod: (info) => dispatch(updateWithSubtracted(info)),
    updatedWithRemovedMethod: (info) => dispatch(updatedWithRemoved(info))
  }
}

export default connect(mapState, mapDispatch)(Cart)
