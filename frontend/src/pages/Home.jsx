import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <NavLink to={'/register'}>Register</NavLink>
      <NavLink to={'/login'}>Login</NavLink>
      <Link to={'/product'}>Product</Link>
    </div>
  )
}

export default Home