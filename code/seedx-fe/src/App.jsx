import React from 'react'
import NavbarComponent from './components/NavbarComponent'
import RouterComponent from './routes/RouterComponent'
import { BrowserRouter as Router } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'

const App = () => {
  return (
   <React.Fragment>
    <Router>
      <ScrollToTop/>
      <NavbarComponent/>
      <RouterComponent/>
    </Router>
   </React.Fragment>
  )
}

export default App
