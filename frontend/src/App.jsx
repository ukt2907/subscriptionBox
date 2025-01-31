import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Product from './pages/Product'
import CreateProduct from './pages/CreateProduct'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/create-product' element={<CreateProduct/>}/>
        <Route path='*' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App