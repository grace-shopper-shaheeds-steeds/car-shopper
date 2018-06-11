import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AddProduct, AddCategory, ProductsList, UpdateProduct, ProductSingle, Cart, ProductSearchResults, UserList, LandingHome} from './components'
import {me} from './store'
import { fetchCartInfo } from './store/cart'
import axios from 'axios'
/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super();
    this.state = {
      tempUserId: ''
    }
  }


  async componentDidMount () {
    console.log('propppps', this.props)
    this.props.loadInitialData()
    console.log('logged in', this.props.isLoggedIn)
    if (this.props.isLoggedIn) {
      this.props.fetchInitialCartInfo()
    }
    if (!(window.localStorage.getItem('tempUserId')) && !this.props.isLoggedIn) {
      const response = await axios.get('/api/cart/temp')
      const data = response.data
      window.localStorage.setItem('tempUserId', data.id)
    }
  }

  
  render () {
    const {isLoggedIn} = this.props
    console.log('window.localstorage', window.localStorage)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingHome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route exact path="/products" component={ProductsList} /> */}


        <Route path="/cart/:userId" component={Cart} />


        <Route exact path="/products/search/:value" component={ProductSearchResults} />
        <Route exact path="/products" component={ProductsList} />
        <Route path="/products/:id" component={ProductSingle} />

        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/addProduct" component={AddProduct} />
              <Route path="/updateProduct/:productId" component={UpdateProduct} />
              <Route path="/addCategory" component={AddCategory} />
              <Route path="/userList" component={UserList} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}

        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */


const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    fetchInitialCartInfo: (info) => dispatch(fetchCartInfo(info)),
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
