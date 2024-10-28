import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import PageLoadingComponent from '../loaders/PageLoadingComponent'

const HomePage = lazy(() => import('../pages/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const SignupPage = lazy(() => import('../pages/SignupPage'))
const ErrorPage = lazy(() => import('../pages/ErrorPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))

const RouterComponent = () => {
  return (
    <div className='pt-20'>
      <Suspense fallback={<PageLoadingComponent/>}  >
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/viewcart' element={<CartPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
    </Suspense>
    </div>
  )
}

export default RouterComponent
