import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div className="container">
    <h2 className="text-center page-header">Welcome, {email}!</h2>

      <div className="row justify-content-md-center">

      <div className="col col-md-6">
        <p className="text-center">Get ready to explore our <Link to="/products">products</Link></p>
      </div>
  `
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
