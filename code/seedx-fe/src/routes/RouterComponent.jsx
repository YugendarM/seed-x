import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import PageLoadingComponent from '../loaders/PageLoadingComponent'
import ProductsPage from '../pages/ProductsPage'
import ProductOverviewPage from '../pages/ProductOverviewPage'
import ProducerOverviewPage from '../pages/ProducerOverviewPage'

const HomePage = lazy(() => import('../pages/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const SignupPage = lazy(() => import('../pages/SignupPage'))
const ErrorPage = lazy(() => import('../pages/ErrorPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const AccountPage = lazy(() => import('../pages/AccountPage'))

const RouterComponent = () => {
  return (
    <div className='pt-20'>
      <Suspense fallback={<PageLoadingComponent/>}  >
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/viewcart' element={<CartPage/>}/>
        <Route path='/account/*' element={<AccountPage/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/products/:productName/:productId' element={<ProductOverviewPage/>}/>
        <Route path='/producer/:producerName/:producerId/*' element={<ProducerOverviewPage/>}/>
        <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
    </Suspense>
    </div>
  )
}

export default RouterComponent
