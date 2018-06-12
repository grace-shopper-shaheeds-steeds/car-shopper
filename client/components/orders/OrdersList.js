import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import  { fetchAllOrders } from '../../store'

export class OrdersList extends Component {

  constructor(){
    super()
  }

  componentDidMount () {
    this.props.fetchOrders()
  }

  handleOrderClick = (event) => {
    event.preventDefault()
    const orderId = Number(event.target.id)
  }

  render(){
    const { orders } = this.props
    const user = this.props.user
    const isAdmin = (user.userType === 'administrator')
    // const isAdmin = true

    return (
      <div className="container">

        <h3 className="text-center page-header">Your Orders</h3>

        <div className="row justify-content-md-center">
        <div className="col col-md-8">

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order #</th>
              <th scope="col">Date</th>
              <th scope="col">Total</th>
              <th scope="col">User</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
          {
            orders && orders.filter((order) => {
                  // Only display open or filled orders to this user
                  if (isAdmin || order.status !== 'Cancelled') {
                    return ( isAdmin || (order.userId === user.id) )
                  }
              })
              .sort(function(a,b) {
                return ( (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0) );
                } )
              .map((order) => {
                let orderDate = new Date(order.createdAt)
                let dd = orderDate.getDate();
                let mm = orderDate.getMonth()+1;
                let yyyy = orderDate.getFullYear();
                if ( dd < 10 )
                {
                    dd = '0' + dd;
                }

                if ( mm < 10 )
                {
                    mm = '0' + mm;
                }
                let dStr = mm + '-' + dd + '-' + yyyy;

                return (
                  <tr key={order.id}>
                    <th scope="row">
                      <Link to={`/orders/${order.id}`}> {order.id} </Link>
                    </th>

                    <td>{dStr}</td>
                    <td>${order.totalAmt / 100.00 }</td>
                    <td>{user.email}</td>
                    <td>{order.status}</td>
                  </tr>
                )
            })
          }
          </tbody>
        </table>

        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => {
      dispatch(fetchAllOrders())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList)
