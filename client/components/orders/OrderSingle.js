import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneOrder } from '../../store'
import OrderItem from './OrderItem'
import history from '../../history'


class OrderSingle extends Component {

  componentDidMount(){
    const id = this.props.match.params.id
    console.log('Logging:  Calling fetchOrder with ID = ', id)
    this.props.fetchOrder(id)
  }

  render () {
      const { order, user } = this.props
      if ( !order.id || (user.userType !== 'administrator') && (order.userId !== user.id )) {
        console.log('No Order.....')
        return ( <h3>No order exists for this user</h3> )
      }

      const fullName = order.user.firstName + ' ' + order.user.lastName

      return (
        <div className="container" id="order-single">

        <h2 className="text-center page-header">Details for Order #{order.id}</h2>

        <div className="row justify-content-md-center">

          <div className="col col-md-6">

            <div className="card order-user-details">
              <h5 className="card-header">User Details</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{fullName}</li>
                <li className="list-group-item">{order.address.street}, {order.address.state}  {order.address.zipCode}</li>
              </ul>
            </div>

          </div>

          <div className="col col-md-6">

            <div className="card order-user-details">
              <h5 className="card-header">Order Number: {order.id}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Status: {order.status} </li>
                <li className="list-group-item">Total: ${order.totalAmt / 100.00}</li>
              </ul>
            </div>

          </div>
        </div>

        <p />
        <section>
        <div className="container">

        <h4 className="text-center page-header">Items Ordered</h4>

          <div className="row justify-content-md-center">
            <div className="col col-md-10">
            {
              order.orderItems.map(item => {
                return (
                  <div key={item.id}>
                    <OrderItem item={item} key={item.id} />
                    <hr />
                  </div> )
              })
            }
            </div>
          </div>

        </div>
        </section>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    order: state.orderReducer.currentOrder,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (orderId) => {
      dispatch(fetchOneOrder( orderId ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSingle);
