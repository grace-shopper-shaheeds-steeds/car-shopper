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

      if ( !order.id || order.id !== user.id ) {
        console.log('No Order.....')
        return ( <h3>No order exists for this user</h3> )
      }
        
      const fullName = order.user.firstName + ' ' + order.user.lastName

      return (
      <div>
        <div className="container"> 
          <div className="row">
            {
            <div className="col-3"> 
              <h4> {fullName} </h4>
              <p> </p>
              <p> {order.address.street} </p> 
              <p> {order.address.city}, {order.address.state}  {order.address.zipCode} </p>
            </div>
            }
            
            <div className="col-6"> </div>

            {
            <div className="col-3"> 
              <h5> Order Number: {order.id} </h5>
              <p> </p>
              <p>  Status: {order.status} </p> 
              <p>  Total: ${order.totalAmt / 100.00} </p>
            </div>
            }
          </div>
        </div>

        <p> </p>
        <section> 
        <div className="container"> 
        {  
          order.orderItems.map(item => {
            return ( <OrderItem item={item} key={item.id} /> )
          })
        }
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
  console.log('Entered Dispatch to Props....')
  return {
    fetchOrder: (orderId) => {
      console.log('Logging:  About to dispatch fetchOneOrder with orderId = ', orderId)

      dispatch(fetchOneOrder( orderId ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSingle);
