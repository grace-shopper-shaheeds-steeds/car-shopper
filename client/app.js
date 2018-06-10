import React from 'react'

import {Navbar} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div style={{height: '100%'}} >
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
