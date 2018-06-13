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
    <div className='cartMainWrap'>
      {
        (!cart) ? <div>Rendering...</div> : ''
      }
      <h3 className='titleForCart' >Cart for User {currentUser.email}</h3>
      {
        uniqueProducts.map(product => {
          const subTotal = (product.price * cart.quantity[product.id]).toFixed(2)

          if (!subTotal || isNaN(subTotal)) return ''
          return (
            <div key={product.id} className='eachProductInCart'>
              <img className='cartImage' src={product.photo} />
              <div className='halfCartItem'>
                <div>
                  <h3 className='cartTitle'>{product.title}</h3>
                  <button className='btn btn-danger' onClick={() => this.handleDelete(product.id)}>Remove</button>
                </div>
                <div className='cartdescrip'>Description: {product.description}</div>
                <div>Unit Price: ${product.price}</div>
                <div>
                  <div className='cartQuant'>quantity {cart.quantity[product.id]}</div>
                  <div className='incDecParent'>
                    <button id='dec' className='btn btn-warning' onClick={() => this.handleDecrement(product.id)}>- 1</button>
                    <button id='inc' className='btn btn-primary' onClick={() => this.handleIncrement(product.id)}>+ 1</button>
                  </div>
                  <h4 className='cartSubtotal'>Subtotal: ${subTotal}</h4>
                </div>
              </div>
              
            </div>
          )
        })
      }
      <h2>Total: ${cart.total}</h2>
      <Link to='/orders/create/'>
      <button id='checkoutbutton' className='btn btn-success'>Proceed to Checkout</button>
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
