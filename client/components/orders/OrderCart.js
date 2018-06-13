import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderCartDetail from './OrderCartDetail'

class OrderCart extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
      let cart = this.props.cart
      let products = this.props.products
      return (
        <div>
          <h3>Cart Items</h3>
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">{cart.products.length}</span>
            </h4>
            <ul className="list-group mb-3">
                {
                  products.map( (product) => {
                    return <OrderCartDetail product={product} key={product.id} />
                  })
                }
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${cart.total}</strong>
                </li>
 
            </ul>
          </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products
  }
}

export default connect(mapStateToProps, null)(OrderCart);
