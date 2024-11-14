import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProducerPageProductsComponent from '../components/ProducerPageTabs/ProducerPageProductsComponent'
import ProducerPagePhotosComponent from '../components/ProducerPageTabs/ProducerPagePhotosComponent'
import ProducerPageReviewsComponent from '../components/ProducerPageTabs/ProducerPageReviewsComponent'

const ProducerRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to={"products"} replace/>}/>
        <Route path='/products' element={<ProducerPageProductsComponent/>}/>
        <Route path='/photos' element={<ProducerPagePhotosComponent/>}/>
        <Route path='/reviews' element={<ProducerPageReviewsComponent/>}/>
        <Route path='/proofs' element={<div>Proofs</div>}/>
    </Routes>
  )
}

export default ProducerRouter


