import React from 'react'
import NavbarComponent from './components/NavbarComponent'
import RouterComponent from './routes/RouterComponent'
import { BrowserRouter as Router } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'
import { UserProvider } from './context/userContext'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
   <React.Fragment>
    <Router>
      <ScrollToTop/>
      <UserProvider>
        <NavbarComponent/>
        <RouterComponent/>
      </UserProvider>
      <ToastContainer />
    </Router>
   </React.Fragment>
  )
}

export default App
