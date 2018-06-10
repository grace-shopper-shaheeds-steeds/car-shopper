import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  const header = (
    <h2 className="text-center">
      Account {name === 'login' ? 'Login' : 'Register'}
    </h2>
  )

  return (
    <div className="container">

      { header}

      <div className="row justify-content-md-center">
        <div className="col col-md-6">

        <form onSubmit={handleSubmit} name={name}>

          <div className="form-group">
            <label htmlFor="email"><small>Email</small></label>
            <input className="form-control" name="email" type="text" />
          </div>

        { name === 'signup' &&
          <div>
            <div className="form-group">
              <label htmlFor="firstName"><small>First Name</small></label>
                <input className="form-control" name="firstName" type="text" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName"><small>Last Name</small></label>
              <input className="form-control" name="lastName" type="text" />
            </div>
          </div>
        }

          <div className="form-group">
            <label htmlFor="password"><small>Password</small></label>
            <input className="form-control" name="password" type="password" />
          </div>

          <div className="form-row">

            <div className="form-group col-md-5">
              <button className="btn btn-primary btn-lg btn-block" type="submit">{displayName}</button>
            </div>

            <div className="form-group col-md-2">
              <h5 className="text-center"><i>or</i></h5>
            </div>

            <div className="form-group col-md-5">
              <a href="/auth/google"><img className="google-signin" src="/img/btn_google_signin.png" /></a>
            </div>

          </div>

          {error && error.response && <div> {error.response.data} </div>}
        </form>

        {/* <a className="btn btn-primary" href="/auth/google">{displayName} with Google</a> */}

        </div>
      </div>

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
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
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
