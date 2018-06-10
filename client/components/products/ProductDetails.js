import React from 'react'

const ProductDetails = (props) => {
  const { product, category } = props
  console.log(category)
  return (
    <ul className="details">
      <li>Category: {category.name}</li>
      <li>Price: ${product.price}</li>
      <li>Rating: {product.averageRating}</li>
      <li>Product ID: {product.id}</li>
    </ul>
  )
}

export default ProductDetails
