import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { ProductSearch } from './products'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

    <a className="navbar-brand" href="/">Shaheed's Steeds</a>

      {
        isLoggedIn ? (
        <ul className="navbar-nav ml-auto">
           {/* The navbar will show these links after you log in */}
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addProduct">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addCategory">Add Category</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleClick}>Logout</a>
            </li>
        </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            {/* The navbar will show these links before you log in */}
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
          </ul>
        )
      }

      <ProductSearch />

  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
