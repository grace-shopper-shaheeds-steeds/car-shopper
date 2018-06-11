import React from 'react'

import {Navbar} from './components'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Routes from './routes'



class App extends React.Component {
  constructor() {
    super();

  }
  render() {

    return (
      <div>
        <Navbar isLoggedIn={this.props.isLoggedIn} />
        <Routes userId={this.props.userId} isLoggedIn={this.props.isLoggedIn} />
      </div>
    )
  }
  
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

export default withRouter(connect(mapState)(App))
