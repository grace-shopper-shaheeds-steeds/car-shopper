import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createOrder, addNewContact } from '../../store'
import Select from 'react-select'
import OrderCartDetail from './OrderCartDetail'
import OrderPayment from './OrderPayment'
import { fetchCartInfo, fetchCartProductInfo } from '../../store/cart'

class OrderCreate extends Component {

  constructor() {
    super();
    // We will eventually package all this into one object
    // {address, addressId, cart, userId, saveAddress}
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        ccname: '',
        ccnumber: '',
        ccexpiration: '',
        cvv: ''
      }
    this.countryOptions = this.countryOptions.bind(this)
    this.convertToUnique = this.convertToUnique.bind(this)
  }

  componentDidMount() {
    this.props.fetchCartMethod({ userId: this.props.match.params.userId})
    this.props.fetchCartProductInfoMethod({ userId: this.props.match.params.userId})
  }

  convertToUnique(prods) {
    let notUnique = []
    const uniqueProducts = prods.filter(product => {
      if (notUnique.indexOf(product.id) === -1) {
        notUnique.push(product.id)
        return true
      }
      return false
    })
    return uniqueProducts
  }

  handleChange = event => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  handleSubmit = event => {
    const {cartProducts, user} = this.props
    let products = this.convertToUnique(cartProducts)

    event.preventDefault()

    let newOrder = {
      address: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode,
        country: this.state.country,
      },
      creditCard: {
        ccname: this.state.ccname,
        ccnumber: this.state.ccnumber,
        ccexpiration: this.state.ccexpiration,
        cvv: this.state.cvv,
      },
      cart: this.props.cart,
      userId: user.id,
      quantities: this.props.quantities,
      cartProducts: products
    }

    this.props.submitOrder(newOrder)
  }

  countryOptions = () => {
    const countries = [
      {name: 'USA'},
      {name: 'Canada'},
      {name: 'Mexico'}
    ]
    return countries.map((country) => {
      return { value: country.name, label: country.name  }
    })
  }

  render(){
    const {cartProducts, cart, user} = this.props
    let products = this.convertToUnique(cartProducts)
    return (
      <div>
        <div className="container" id="order-create">

          <h2 className="text-center page-header">Order Checkout</h2>

          <div className="row">
            <div className="col-6">
              <h5 className="page-header">1. Billing Information</h5>

              <form onChange={this.handleChange}>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstName">First Name</label>
                  <input className="form-control" name="firstName" type="text" value={this.state.firstName} />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input className="form-control" name="lastName" type="text" value={this.state.lastName} />
                </div>
              </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input className="form-control" name="email" type="email" value={this.state.email}/>
                </div>

                <div className="form-group">
                  <label htmlFor="street">Address</label>
                  <input className="form-control" name="street" type="text" value={this.state.street}/>
                </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="city">City</label>
                  <input className="form-control" name="city" type="text" value={this.state.city}/>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="state">State</label>
                  <input className="form-control" name="state" type="text" value={this.state.state}/>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="zipCode">Zipcode</label>
                  <input className="form-control" name="zipCode" type="text" value={this.state.zipCode}/>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="country">Country</label>
                  <Select
                    options={this.countryOptions()}
                    value={this.state.country}
                    onChange={value => this.setState({ country: value.label } )}
                  />
                </div>
              </div>

              </form>

              <hr />

              <div className="payment">
                <h5 className="page-header">2. Credit Card Payment</h5>

                <form onChange={this.handleChange}>

                  <div className="form-group">
                    <label htmlFor="ccname">Name on card</label>
                    <input className="form-control" name="ccname" type="text" value={this.state.ccname} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ccnumber">Credit card number</label>
                    <input className="form-control" name="ccnumber" type="text" value={this.state.ccnumber} />
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="ccexpiration">Expiration</label>
                      <input className="form-control" name="ccexpiration" type="text" value={this.state.ccexpiration}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="cvv">CVV</label>
                      <input className="form-control" name="cvv" type="text" value={this.state.cvv} />
                    </div>
                  </div>
                </form>

              </div>

            </div>

            <div className="col-6">
              <div className="cartDetail">
                <h5 className="page-header">3. Order Summary</h5> {
                  products.map(product => {
                    return (
                    <div key={product.id}>
                      <OrderCartDetail
                        qty={cart.quantity[product.id]}
                        product={product}
                        key={product.id} />
                      <hr />
                    </div> )
                  })
                }
              </div>

              <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit Order</button>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.orderReducer.contact,
    cart: state.cart.cart,
    cartProducts: state.cart.cartProducts,
    user: state.user,
    quantities: state.cart.cart.quantity
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartMethod: (info) => dispatch(fetchCartInfo(info)),
    fetchCartProductInfoMethod: (info) => dispatch(fetchCartProductInfo(info)),
    submitOrder: (newOrder) => { dispatch(createOrder(newOrder)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreate)
