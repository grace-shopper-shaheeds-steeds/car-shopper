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
        <div className="container"> 
          <div className="row">
            <div className="col-6"> 
              <h5>Billing Information</h5>

              <div className="row">
                <div className="col-12">
                  <form onChange={this.handleChange}>
                    <label htmlFor="firstName">First Name:</label>
                    <input name="firstName" type="text" value={this.state.firstName}/>

                    <label htmlFor="lastName">Last Name:</label>
                    <input name="lastName" type="text" value={this.state.lastName} />

                    <label htmlFor="email">Email:</label>
                    <input name="email" type="email" value={this.state.email}/>

                    <label htmlFor="street">Address:</label>
                    <input name="street" type="text" value={this.state.street}/>

                    <label htmlFor="city">City:</label>
                    <input name="city" type="text" value={this.state.city}/>

                    <label htmlFor="state">State:</label>
                    <input name="state" type="text" value={this.state.state}/>

                    <label htmlFor="zipCode">Zipcode:</label>
                    <input name="zipCode" type="text" value={this.state.zipCode}/>

                    <label htmlFor="country">Country</label>
                    <Select
                      options={this.countryOptions()}
                      value={this.state.country}
                      onChange={value => this.setState({ country: value.label } )}
                    />
                  </form>
                </div>
              </div>


            </div>
            
            <div className="col-6"> 
              <div className="cartDetail">
                <h5>Order Items</h5> {
                  products.map(product => {
                    return ( <OrderCartDetail product={product} key={product.id} /> )
                  })
                }
              </div>

              <br/> <br/>

              <div className="payment">
                <h5>Credit Card Payment</h5> 
                <form onChange={this.handleChange}>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="ccname">Name on card</label>
                    <input name="ccname" type="text" value={this.state.ccname}/>
                    </div>

                    <div className="col-6">
                      <label htmlFor="ccnumber">Credit card number</label>
                      <input name="ccnumber" type="text" value={this.state.ccnumber}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                    <br/>
                      <label htmlFor="ccexpiration">Expiration</label>
                      <input name="ccexpiration" type="text" value={this.state.ccexpiration}/>
                    </div>
                    <div className="col-6">
                    <br/>
                      <label htmlFor="cvv">CVV</label>
                      <input name="cvv" type="text" value={this.state.cvv}/>
                    </div>
                  </div> 
                </form>
                <br/> <br/>
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit Order</button>
              </div>
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
