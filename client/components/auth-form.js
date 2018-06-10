import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props
  console.log('props.match: ',props.match )

  return (
    props.match.path === '/signup' ? 
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div className="form-group">
            <label htmlFor="firstName"><small>First Name</small></label>
            <input className="form-control" name="firstName" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName"><small>Last Name</small></label>
            <input className="form-control" name="lastName" type="text" />
          </div>
        <div className="form-group">
          <label htmlFor="email"><small>Email</small></label>
          <input className="form-control" name="email" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password"><small>Password</small></label>
          <input className="form-control" name="password" type="password" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a className="btn" href="/auth/google">{displayName} with Google</a>
    </div>:
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div className="form-group">
          <label htmlFor="email"><small>Email</small></label>
          <input className="form-control" name="email" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password"><small>Password</small></label>
          <input className="form-control" name="password" type="password" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a className="btn" href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      //console.log('evt.target.name: ', evt.target.name)
      if(evt.target.name === 'signup'){
        const formName = evt.target.name
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(firstName, lastName, email, password, formName))

      } else {
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(null, null, email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
