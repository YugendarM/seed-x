import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import ErrorPage from '../pages/ErrorPage'
import CartPage from '../pages/CartPage'
import ProfilePage from '../pages/ProfilePage'

const RouterComponent = () => {
  return (
    <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/viewcart' element={<CartPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/*' element={<ErrorPage/>}/>
    </Routes>
  )
}

export default RouterComponent
