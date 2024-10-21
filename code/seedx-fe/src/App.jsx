import React from 'react'
import NavbarComponent from './components/NavbarComponent'
import RouterComponent from './components/RouterComponent'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
   <React.Fragment>
    <Router>
      <NavbarComponent/>
      <RouterComponent/>
    </Router>
   </React.Fragment>
  )
}

export default App
