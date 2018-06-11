import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { createOrder, addNewContact } from '../../store'
import Select from 'react-select'
import OrderCartDetail from './OrderCartDetail'
import OrderPayment from './OrderPayment'

class OrderCreate extends Component {

  constructor() {
    super();
    // We will eventually package all this into one object
    // {address, addressId, cart, userId, saveAddress}
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    }
    // this.countryOptions = this.countryOptions.bind(this)
  }

  componentDidMount () {
  }

  handleChange = event => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  handleSubmit = event => {
    event.preventDefault()
    let newOrder = {
      address: this.state.address,
      cart: this.state.cart,
      userId: this.state.userId
    }

    this.props.submitOrder(newOrder)
  }

  // countryOptions = () => {
  //   const countries = [
  //     {name: 'USA'},
  //     {name: 'Canada'},
  //     {name: 'Mexico'}
  //   ]
  //   return countries.map((country) => {
  //     return { value: country.name, label: country.name  }
  //   })
  // }

  render(){
    let cartProducts = this.props.cartProducts

    return (
      <div>
        <div className="container"> 
          <div className="row">
            <div className="col-6"> 
              <h3>Billing Information</h3>

              <div className="row justify-content-md-center">
                <div className="col-8">
                  <form onChange={this.handleChange}>
                    <label htmlFor="firstName">First Name:</label>
                    <input name="firstName" type="text" value={this.state.firstName}/>

                    <label htmlFor="lastName">Last Name:</label>
                    <input name="lastName" type="text" value={this.state.lastName} />

                    <label htmlFor="email">Email:</label>
                    <input name="email" type="email" value={this.state.email}/>

                    <label htmlFor="address">Address:</label>
                    <input name="address" type="text" value={this.state.address}/>

                    <label htmlFor="city">City:</label>
                    <input name="city" type="text" value={this.state.city}/>

                    <label htmlFor="state">State:</label>
                    <input name="state" type="text" value={this.state.state}/>

                    <label htmlFor="zipcode">Zipcode:</label>
                    <input name="zipcode" type="text" value={this.state.zipcode}/>

                    <label htmlFor="country">Country:</label>
                    <input name="country" type="text" value={this.state.country}/>

                    <div className="form-group col-md-6">
                    <label htmlFor="country">Country</label>
                    {/* <Select
                      options={this.countryOptions()}
                      value={this.state.country}
                      onChange={value => this.setState({ country: value.label })}
                    /> */}
                    </div>
                  </form>
                </div>
              </div>


            </div>
            
            <div className="col-6"> 
              <div className="col-12">
                <h3>Order Items</h3> 
                {  
                  {/* cartProducts.map(product => {
                    return ( <OrderCartDetail product={product} key={product.id} /> )
                  }) */}
                }
              </div>

              <div className="col-12">
                <h3>Credit Card Payment</h3> 
                {/* <OrderPayment /> */}
              </div>
            </div>

          </div>
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit Order</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.orderReducer.contact,
    cart: state.cart.cart,
    cartProducts: state.cart.cartProducts,
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
      dispatch(addNewContact(newOrder.address, this.state.userId))
      dispatch(createOrder(newOrder))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreate)
