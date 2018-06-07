import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchCartInfo, updatedWithRemoved } from '../store/cart'

const local = window.localStorage

class Cart extends React.Component {
  constructor() {
    super();

  }

  componentDidMount() {
    // this.props.fetchCartMethod(this.props.user.id)
  }

  createCart() {
    this.props.

    local.setItem('cartId', newCart.id)
  }

  
  render() {
    const { isLoggedIn, firstName } = this.props

    
    
    console.log('local storage object', local)


    if (!isLoggedIn && !local.getItem('cartId')) {
      this.createCart()
    }

    // console.log('props in render', this.props)
    // if ()
    return (
    <div>
        { isLoggedIn ? (<h1>Cart for {firstName}</h1>) : (<h1>Cart for guest</h1>) }
    <div>
    <h1>test</h1>
    </div>
    </div>
    )
  }

}

const mapState = state => {
  console.log('state', state)
  return {
    currentUser: state.user,
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCartMethod: (info) => dispatch(fetchCartInfo(info)),
    updatedWithRemovedMethod: (info) => dispatch(updatedWithRemoved(info))
  }
}

export default connect(mapState)(Cart)
