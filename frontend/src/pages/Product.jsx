import React from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <div>
      <h1>Product Page</h1>
        <Link to={'/create-product'}>Create Product</Link>
    </div>
  )
}

export default Product