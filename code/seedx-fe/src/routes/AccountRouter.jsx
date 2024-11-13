import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProfilePage from '../pages/ProfilePage'
import OrdersPage from '../pages/OrdersPage'
import WishlistPage from '../pages/WishlistPage'

const AccountRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to={"profile"} replace/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/orders' element={<OrdersPage/>}/>
        <Route path='/wishlist' element={<WishlistPage/>}/>
    </Routes>
  )
}

export default AccountRouter
